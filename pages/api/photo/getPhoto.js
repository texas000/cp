const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const { id } = req.query;
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		let pool = await sql.connect(process.env.SERVER5);
		try {
			let result = await pool.request().query(`SELECT * FROM IMAGES;`);

			var fileContents = Buffer(result.recordset[0].imageFile, "base64");
			// res.set("Content-Type", "image/jpg");
			res.json(result.recordset[1]);

			// res.contentType("image/png");

			// res.send(
			// 	`data:image/png;base64, ${Buffer.from(
			// 		result.recordset[0].imageFile
			// 	).toString("base64")}`
			// );
			// res.json();
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
