import firestore from "../../../lib/firestore";
import auth from "../../../lib/auth";
const sql = require("mssql");

export default (req, res) => {
	var info = {
		email: "user2@example.com",
		emailVerified: false,
		password: "jwiinc",
		displayName: "Shaco Kim",
		photoURL: "https://www.mobafire.com/images/champion/square/shaco.png",
		disabled: false,
	};
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
						`INSERT INTO [dbo].[USER] ([uid],[created],[customer],[email],[photoURL],[signIn],[displayName]) VALUES (N'${uid}', GETDATE(), '0', N'${info.email}', N'${info.photoURL}', GETDATE(), N'${info.displayName}');`
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
