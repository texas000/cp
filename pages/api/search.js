const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	// IF THERE IS QUERY STRING
	const { q } = req.query;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);

	// ENABLE API KEY
	// const auth = req.headers.authorization;
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		// GET TOKEN FROM COOKIE
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		if (!token) {
			console.log(token);
			res.status(400).send();
			return;
		}
		// CREATE SQL POOL CONNECTION
		let pool = new sql.ConnectionPool(process.env.SERVER2);
		try {
			// WAIT TIL POOL CONNECT
			await pool.connect();
			// GET RESULT FROM SQL QUERY
			let result = await pool.request().query(`
                SELECT TOP 15 * FROM
(
select 'OIM' as Type, 'uil-ship' as Icon,  F_CustRefNo, (select F_RefNo from T_OIMMAIN M where M.F_ID=H.F_OIMBLID) as F_RefNo, (select F_ETA from T_OIMMAIN M where M.F_ID=H.F_OIMBLID) as F_ETA from T_OIHMAIN H where H.F_CustRefNo like '%${q}%' AND H.F_Customer='${token.customer}'
UNION ALL
select 'OEX' as Type, 'uil-ship' as Icon, F_ExPref, (select F_RefNo from T_OOMMAIN M where M.F_ID=H.F_OOMBLID) as F_RefNo, (select F_ETA from T_OOMMAIN M where M.F_ID=H.F_OOMBLID) as F_ETA from T_OOHMAIN H where H.F_ExPref like '%${q}%' AND H.F_Customer='${token.customer}'
UNION ALL
select 'AIM' as Type, 'uil-plane' as Icon, F_CustRefNo, (select F_RefNo from T_AIMMAIN M where M.F_ID=H.F_AIMBLID) as F_RefNo, (select F_ETA from T_AIMMAIN M where M.F_ID=H.F_AIMBLID) as F_ETA from T_AIHMAIN H where H.F_CustRefNo like '%${q}%' AND H.F_Customer='${token.customer}'
UNION ALL
select 'AEX' as Type, 'uil-plane' as Icon, F_ExpRefNo, (select F_RefNo from T_AOMMAIN M where M.F_ID=H.F_AOMBLID) as F_RefNo, (select F_ETA from T_AOMMAIN M where M.F_ID=H.F_AOMBLID) as F_ETA from T_AOHMAIN H where H.F_ExpRefNo like '%${q}%' AND H.F_Customer='${token.customer}'
UNION ALL
select 'INV' as Type, 'uil-invoice' as Icon, F_YourRef, F_InvoiceNo as F_RefNo, F_DueDate as F_ETA from T_INVOHD where F_InvoiceNo like '%${q}%' AND F_BillTo='${token.customer}'
)X ORDER BY F_ETA DESC;
                `);
			// SEND RESULT
			res.json(result.recordset);
		} catch (err) {
			// IF ERROR, SEND ERROR - POSSIBLE ERROR: BAD QUERY
			res.status(400).json(err);
		}
		return pool.close();
	} catch (err) {
		// IF ERROR SEND CORRESPONDING ERROR
		// POSSIBLE ERROR - JWT ERROR & SQL CONNECTION ERROR
		if (err) {
			res.status(403).json(err);
			return;
		}
	}
}
