const sql = require("mssql");

//   T_EMAIL_NOTIFICATION
export default async (req, res) => {
	await sql.connect(process.env.SERVER5);
	try {
		const result =
			await sql.query`INSERT INTO [dbo].[USER] ([uid],[created],[customer],[email],[photoURL],[signIn],[displayName]) VALUES ('1', GETDATE(), '0', 'MAIL', 'PHOTO', GETDATE(), 'NAME');`;
		res.json(result);
	} catch (err) {
		res.json({ err: err });
	}
	return sql.close();
};
