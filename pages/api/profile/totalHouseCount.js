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
			let result = await pool.request().query(
				`select COUNT(*) AS CNT, 'OCEAN IMPORT' as REF from T_OIHMAIN where F_Customer='${token.customer}' 
                UNION 
                select COUNT(*) AS CNT, 'OCEAN EXPORT' as REF from T_OOHMAIN where F_Customer='${token.customer}'
                UNION
                select COUNT(*) AS CNT, 'AIR IMPORT' as REF from T_AIHMAIN where F_Customer='${token.customer}'
                UNION
                select COUNT(*) AS CNT, 'AIR EXPORT' as REF from T_AOHMAIN where F_Customer='${token.customer}'`
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
