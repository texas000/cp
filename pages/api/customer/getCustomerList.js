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
					`SELECT F_ID AS id, F_ID as value, F_SName as label FROM [dbo].[T_COMPANY];`
				);
			res.json(result.recordset);
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
