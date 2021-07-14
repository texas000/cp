const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { id } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		if (!token) {
			res.status(401).json({ err: 401, msg: "Unauthorized" });
			return;
		}
		let pool = new sql.ConnectionPool(process.env.SERVER2);

		try {
			await pool.connect();

			let result = await pool
				.request()
				.query(`SELECT TOP 1 * FROM T_INVOHD WHERE F_InvoiceNo='${id}';`);
			// console.log(result.recordset[0]);
			//INNER JOIN T_COMPANY ON T_COMPANY.F_ID=T_INVOHD.F_BillTo
			var master = "SELECT 1;";

			if (result.recordset.length) {
				master = result.recordset.map((ga, i) => {
					if (i) {
						return ` OR F_INVOHDID='${ga.F_ID}'`;
					} else {
						return `F_INVOHDID='${ga.F_ID}'`;
					}
				});
				master = `SELECT * FROM T_INVODETAIL WHERE ${master.join("")}`;
			}
			let detail = await pool.request().query(master);

			let billto = await pool
				.request()
				.query(
					`SELECT * FROM T_COMPANY WHERE F_ID='${result.recordset[0].F_BillTo}'`
				);
			let shipto = await pool
				.request()
				.query(
					`SELECT * FROM T_COMPANY WHERE F_ID='${result.recordset[0].F_ShipTo}'`
				);

			let house = await pool
				.request()
				.query(
					`SELECT * FROM ${result.recordset[0].F_TBName} WHERE F_ID='${result.recordset[0].F_TBID}'`
				);
			var isOIM = house.recordset[0].hasOwnProperty("F_OIMBLID");
			var isOOM = house.recordset[0].hasOwnProperty("F_OOMBLID");
			var isAIM = house.recordset[0].hasOwnProperty("F_AIMBLID");
			var isAOM = house.recordset[0].hasOwnProperty("F_AOMBLID");
			if (isOIM || isOOM || isAIM || isAOM) {
				let master = await pool
					.request()
					.query(
						`SELECT * FROM ${
							isOIM
								? "T_OIMMAIN"
								: isOOM
								? "T_OOMMAIN"
								: isAIM
								? "T_AIMMAIN"
								: isAOM
								? "T_AOMMAIN"
								: ""
						} WHERE F_ID='${
							isOIM
								? house.recordset[0].F_OIMBLID
								: isOOM
								? house.recordset[0].F_OOMBLID
								: isAIM
								? house.recordset[0].F_AIMBLID
								: isAOM
								? house.recordset[0].F_AOMBLID
								: ""
						}'`
					);
				res.json({
					Main: result.recordset[0],
					Detail: detail.recordset,
					Bill: billto.recordset[0],
					Ship: shipto.recordset[0],
					House: house.recordset[0],
					Master: master.recordset[0],
				});
			} else {
				res.json({
					Main: result.recordset[0],
					Detail: detail.recordset,
					Bill: billto.recordset[0],
					Ship: shipto.recordset[0],
					House: house.recordset[0],
					Master: [],
				});
			}
		} catch (err) {
			res.json(err);
		}
		return pool.close();
	} catch (err) {
		if (err) {
			res.status(403).json({ err: 403, msg: "Invalid Token" });
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
