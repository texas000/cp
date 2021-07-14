const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { name } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		let pool = new sql.ConnectionPool(process.env.SERVER5);
		try {
			await pool.connect();
			let result = await pool
				.request()
				.query(
					`SELECT TOP 100 *,(SELECT name FROM CITIES where geonameid=fromCity) AS fromCityName,(SELECT name FROM CITIES where geonameid=toCity) AS toCityName  FROM [dbo].[QUOTE]`
				);
			res.json(result.recordset);
		} catch (err) {
			res.json(err);
		}
		return pool.close();
	} catch (err) {
		if (err) {
			res.status(403).json(err);
			return;
		}
	}
}
