const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	// IF THERE IS QUERY STRING
	// const { user } = req.query;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	// ENABLE API KEY
	// const auth = req.headers.authorization;
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		// GET TOKEN FROM COOKIE
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		if (!token) {
			console.log(token);
			res.status(400).send();
			return;
		}
		// CREATE SQL POOL CONNECTION
		let pool = new sql.ConnectionPool(process.env.SERVER5);
		try {
			// WAIT TIL POOL CONNECT
			await pool.connect();
			// GET RESULT FROM SQL QUERY
			let result = await pool.request().query(`ABCD`);
			// SEND RESULT
			res.json(result.recordset);
		} catch (err) {
			// IF ERROR, SEND ERROR - POSSIBLE ERROR: BAD QUERY
			res.status(400).json(err);
		}
		return pool.close();
	} catch (err) {
		// IF ERROR SEND CORRESPONDING ERROR
		// POSSIBLE ERROR - JWT ERROR & SQL CONNECTION ERROR
		if (err) {
			res.status(403).json(err);
			return;
		}
	}
}
