const sql = require("mssql");

//   T_EMAIL_NOTIFICATION
export default async (req, res) => {
	await sql.connect(process.env.SERVER5);
	try {
		const result = await sql.query(`select * from CONFIG`);
		res.json(result.recordset);
	} catch (err) {
		res.json({ err: err });
	}
	return sql.close();
};
