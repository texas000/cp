const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async (req, res) => {
	//POST
	// SECURE THE API (KEY)
	const auth = req.headers.authorization;

	if (req.method != "POST") {
		res.status(403).json({ err: 403, msg: "Method Not Allowed" });
		return;
	}
	if (auth !== process.env.API_KEY) {
		res.status(401).json({ err: 401, msg: "Unauthorized" });
		return;
	}
	const body = JSON.parse(req.body);

	let pool = await sql.connect(process.env.SERVER5);
	try {
		let result = await pool
			.request()
			.query(`SELECT * FROM [dbo].[USER] WHERE email='${body.email}';`);
		if (result.rowsAffected) {
			const token = jwt.sign(result.recordset[0], process.env.API_KEY, {
				expiresIn: "10h", // it will be expired after 10 hours
				//expiresIn: "20d" // it will be expired after 20 days
				//expiresIn: 120 // it will be expired after 120ms
				//expiresIn: "120s" // it will be expired after 120s
			});
			const serializedToken = cookie.serialize("jwitoken", token);
			res.json({ token: serializedToken });
		}
	} catch (err) {
		res.status(403).json(err);
	}
	return pool.close();
};
