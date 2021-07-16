const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		var userList = [];
		let pool = new sql.ConnectionPool(process.env.SERVER5);

		try {
			await pool.connect();
			let result = await pool
				.request()
				.query(`SELECT TOP 100 * FROM [dbo].[USER]`);
			userList = result.recordset;
			// res.json(result.recordset);
		} catch (err) {
			res.json(err);
		}

		pool.close();
		let pool5 = new sql.ConnectionPool(process.env.SERVER2);
		try {
			var CompanyList = userList.map((ga, i) => {
				if (i) {
					return ` OR F_ID='${ga.customer}'`;
				} else {
					return `F_ID='${ga.customer}'`;
				}
			});
			await pool5.connect();
			let result = await pool5
				.request()
				.query(
					`SELECT F_ID, F_SName FROM [dbo].[T_COMPANY] WHERE ${CompanyList.join(
						""
					)}`
				);
			// if user has the customer id, then save the name
			userList.forEach((ga, i) => {
				var companyName = result.recordset.find(
					(element) => element.F_ID == ga.customer
				);
				userList[i] = { ...ga, companyName: companyName.F_SName };
			});
			res.json(userList);
		} catch (err) {
			res.json(err);
		}
		return pool5.close();
	} catch (err) {
		if (err) {
			res.status(403).json(err);
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
