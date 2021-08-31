const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { id } = req.query;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		// console.log(token);
		let pool = new sql.ConnectionPool(process.env.SERVER21);
		const qry = `SELECT * FROM T_FILE WHERE F_REF='${id}' AND F_SECURITY='10' ORDER BY F_ID DESC`;
		try {
			await pool.connect();
			let result = await pool.request().query(qry);
			res.json(result.recordset || []);
		} catch (err) {
			res.json(err);
		}
		return pool.close();
	} catch (err) {
		if (err) {
			console.log(err);
			res.status(403).json([]);
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
