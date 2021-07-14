const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");
const SqlString = require("sqlstring");
export default async function handler(req, res) {
	const { name } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		const body = JSON.parse(req.body);
		var qry = SqlString.format(
			"INSERT INTO [dbo].[QUOTE] VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE(), ?)",
			[
				body.fromCity,
				body.toCity,
				body.fromType,
				body.toType,
				body.commodity,
				body.isDG,
				body.class,
				body.un,
				body.containerType,
				body.containerQty,
				body.containerWeight,
				body.expectedDate,
				token.uid,
			]
		);
		console.log(qry);
		let pool = new sql.ConnectionPool(process.env.SERVER5);
		try {
			await pool.connect();
			let result = await pool.request().query(qry);
			res.json(result);
		} catch (err) {
			console.log(err);
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
