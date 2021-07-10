const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);

		let pool = new sql.ConnectionPool(process.env.SERVER2);

		try {
			await pool.connect();
			let result = await pool
				.request()
				.query(
					`SELECT TOP 100 * FROM [jwisql].[dbo].[T_OIHMAIN] FULL OUTER JOIN [jwisql].[dbo].[T_OIMMAIN] ON T_OIMMAIN.F_ID=T_OIHMAIN.F_OIMBLID WHERE T_OIHMAIN.F_Customer='10' ORDER BY T_OIMMAIN.F_ID DESC;`
				);
			res.json(result.recordset);
		} catch (err) {
			res.json(err);
		}

		return pool.close();
	} catch (err) {
		if (err) {
			console.log(err);
			res.status(403).json({ err: 403, msg: "Invalid Token" });
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
