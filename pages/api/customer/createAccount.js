import firestore from "../../../lib/firestore";
import auth from "../../../lib/auth";
const sql = require("mssql");

export default (req, res) => {
	var info = JSON.parse(req.body);
	// Create User
	auth
		.createUser(info)
		.then(async (userRecord) => {
			const { uid } = userRecord;
			// Store User Data to Database
			let pool = new sql.ConnectionPool(process.env.SERVER5);
			try {
				await pool.connect();
				let result = await pool
					.request()
					.query(
						`INSERT INTO [dbo].[USER] ([uid],[created],[customer],[email],[photoURL],[signIn],[displayName],[admin]) VALUES (N'${uid}', GETDATE(), '${info.cust}', N'${info.email}', N'${info.photoURL}', GETDATE(), N'${info.displayName}', '0');`
					);
				res.json(result);
			} catch (err) {
				sql.close();
				res.json(err);
			}
			return pool.close();
		})
		.catch((err) => {
			res.json(err);
		});
};
export const config = {
	api: {
		externalResolver: true,
	},
};
