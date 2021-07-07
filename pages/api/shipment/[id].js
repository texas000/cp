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
		try {
			let pool = await sql.connect(process.env.SERVER2);
			let result = await pool
				.request()
				.query(
					`SELECT TOP 100 * FROM [jwisql].[dbo].[T_OIHMAIN] FULL OUTER JOIN [jwisql].[dbo].[T_OIMMAIN] ON T_OIMMAIN.F_ID=T_OIHMAIN.F_OIMBLID WHERE T_OIMMAIN.F_RefNo='${id}' ORDER BY T_OIMMAIN.F_ID DESC;`
				);
			res.json(result.recordset);
		} catch (err) {
			res.json(err);
		}
		return sql.close();
	} catch (err) {
		if (err) {
			res.status(403).json({ err: 403, msg: "Invalid Token" });
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
