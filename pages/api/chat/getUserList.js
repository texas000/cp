const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

// 1F25F58A-8DB7-49FB-A51B-AAFEF00F9787

export default async function handler(req, res) {
	const { user } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (!user) {
	// 	res.status(404).json({ err: 404, msg: "Not Found" });
	// 	return;
	// }
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		let pool = new sql.ConnectionPool(process.env.SERVER5);
		try {
			await pool.connect();
			let result = await pool
				.request()
				.query(
					`SELECT * FROM dbo.[USER] WHERE uid<>'p7ixY3zCjOQ0Kq67ABHqySvhQVh2' ;`
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
