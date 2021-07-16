const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { recipient } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }
	if (!recipient) {
		res.status(404).json({ err: 404, msg: "Not Found" });
		return;
	}

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		const message = req.body;
		let pool = new sql.ConnectionPool(process.env.SERVER5);
		try {
			await pool.connect();
			let result = await pool.request().query(
				`INSERT INTO [dbo].[MESSAGE] ([SUBJECT]
                        ,[CREATOR_ID]
                        ,[MESSAGE_BODY]
                        ,[CREATE_DATE]
                        ,[EXPIRY_DATE]
                        ,[IS_REMINDER]
                        ,[REMINDER_FREQUENCY_ID]) VALUES ('SUBJECT', '${message.uid}', N'${message.msg}', GETDATE(), '2021-12-30', '0', '1');
				INSERT INTO [dbo].[MESSAGE_RECIPIENT] ([RECIPIENT_ID], [MESSAGE_ID], [IS_READ]) VALUES('${recipient}',@@IDENTITY, 0);`
			);
			res.json(result);
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

// SELECT msg.subject, sent_to,
//        msg.create_date, (summ / countt) * 100 AS Read_Per
// FROM (SELECT msg.subject, grp.name as sent_to,  msg.create_date,
//       SUM (is_read) AS summ, COUNT (is_read) AS countt
//       FROM message_recipient msgrec,  message msg,
//            user_group ug,  group grp
//       WHERE  msgrec.message_id = msg.id
//       AND msgrec.recipient_group_id = ug.id
//       AND ug.GROUP_ID = grp.id
//       AND msgrec.recipient_group_id IS NOT NULL
//       GROUP BY msg.subject, grp.name, msg.create_date
//       UNION
//       SELECT msg.subject, u.first_name || ' ' || u.last_name as sent_to,
//       msg.create_date, SUM (is_read) AS summ, COUNT (is_read) AS countt
//       FROM message_recipient msgrec, MESSAGE msg,  user u
//       WHERE msgrec.message_id = msg.id
//       AND msgrec.recipient_id = u.id
//       AND msgrec.recipient_group_id IS NULL
//       GROUP BY msg.subject, name, msg.create_date);
