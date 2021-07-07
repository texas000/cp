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
		await sql.connect(process.env.SERVER2);
		try {
			const Invoice = await sql.query(
				`SELECT TOP 100 * FROM T_INVOHD WHERE F_BillTo='10' AND F_PaidAmt='0' ORDER BY F_ID DESC;`
			);
			res.json(Invoice.recordset);
		} catch (err) {
			res.json({ err: err });
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
