const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { id, q } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }
	if (!q) {
		res.status(404).json({ err: 404, msg: "Not Found" });
	}

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		let pool = new sql.ConnectionPool(process.env.SERVER2);
		var isContainer = false;
		var houseTable, blid;
		var querys = "";
		switch (q) {
			case "OIM":
				querys = `select * from T_OIMMAIN as M where F_RefNo='${id}';`;
				houseTable = "T_OIHMAIN";
				blid = "F_OIMBLID";
				isContainer = "T_OIMCONTAINER";
				break;
			case "OEX":
				querys = `select * from T_OOMMAIN as M where F_RefNo='${id}';`;
				houseTable = "T_OOHMAIN";
				blid = "F_OOMBLID";
				isContainer = "T_OOMCONTAINER";
				break;
			case "AIM":
				querys = `select * from T_AIMMAIN as M where F_RefNo='${id}';`;
				houseTable = "T_AIHMAIN";
				blid = "F_AIMBLID";
				break;
			case "AEX":
				querys = `select * from T_AOMMAIN as M where F_RefNo='${id}';`;
				houseTable = "T_AOHMAIN";
				blid = "F_AOMBLID";
				break;
			default:
				throw new Error("NO QUERY STRING");
		}
		try {
			await pool.connect();
			let master = await pool.request().query(querys);
			let house = await pool
				.request()
				.query(
					`SELECT * FROM ${houseTable} AS H WHERE ${blid}='${master.recordset[0].F_ID}';`
				);
			if (isContainer) {
				isContainer = await pool
					.request()
					.query(
						`select * from ${isContainer} WHERE ${blid}='${master.recordset[0].F_ID}'`
					);
			}
			res.json({
				master: master.recordset[0],
				house: house.recordset,
				container: isContainer.recordset || [],
			});
		} catch (err) {
			res.json(err);
		}
		return pool.close();
	} catch (err) {
		if (err) {
			res.status(200).json([]);
			return;
		}
	}
}
