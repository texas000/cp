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
		// console.log(token);
		try {
			let pool = await sql.connect(process.env.SERVER2);
			let result1 = await pool
				.request()
				.query(`SELECT TOP 100 * FROM T_OIHMAIN WHERE F_Customer='10';`);
			res.json(result1.recordset);
		} catch (err) {
			res.json(err);
		}
	} catch (err) {
		if (err) {
			console.log(err);
			// res.status(403).json(err);
			// res.status(403).json({ err: 403, msg: "Invalid Token" });
			return;
		}
	}

	// res.status(200).json({ msg: "success" });
}
