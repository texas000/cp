const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sql = require("mssql");

export default async function handler(req, res) {
	const auth = req.headers.authorization;
	const rawCookie = req.headers.cookie || "";
	const cookies = cookie.parse(rawCookie);
	// if (auth !== process.env.API_KEY) {
	// 	res.status(401).json({ err: 401, msg: "Unauthorized" });
	// 	return;
	// }

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);

		let pool = new sql.ConnectionPool(process.env.SERVER2);

		//`SELECT TOP 100 * FROM [jwisql].[dbo].[T_OIHMAIN] FULL OUTER JOIN [jwisql].[dbo].[T_OIMMAIN] ON T_OIMMAIN.F_ID=T_OIHMAIN.F_OIMBLID WHERE T_OIHMAIN.F_Customer='10' ORDER BY T_OIMMAIN.F_ID DESC;`
		try {
			await pool.connect();
			let result = await pool.request().query(
				`SELECT Type, CustRef, Ready, Ref from(SELECT TOP 25 'OIM' as Type, H.F_CustRefNo as CustRef, H.F_FETA as Ready, (SELECT M.F_RefNo FROM T_OIMMAIN as M where M.F_ID=H.F_OIMBLID) as Ref FROM T_OIHMAIN as H where H.F_Customer='${token.customer}' order by H.F_ID desc) oim
UNION
SELECT Type, CustRef, Ready, Ref from(SELECT TOP 25 'AIM' as Type, H.F_CustRefNo as CustRef, H.F_FETA as Ready, (SELECT M.F_RefNo FROM T_AIMMAIN as M where M.F_ID=H.F_AIMBLID) as Ref FROM T_AIHMAIN AS H where H.F_Customer='${token.customer}' order by H.F_ID desc) aim
UNION
SELECT Type, CustRef, Ready, Ref from(SELECT TOP 25 'OEX' as Type, H.F_ExPref as CustRef, H.F_OnboardDate as Ready, (SELECT M.F_RefNo FROM T_OOMMAIN as M where M.F_ID=H.F_OOMBLID) as Ref FROM T_OOHMAIN AS H where H.F_Customer='${token.customer}' order by H.F_ID desc) oex
UNION
SELECT Type, CustRef, Ready, Ref from(SELECT TOP 25 'AEX' as Type, H.F_ExpRefNo as CustRef, H.F_BLDate as Ready, (SELECT M.F_RefNo FROM T_AOMMAIN as M where M.F_ID=H.F_AOMBLID) as Ref FROM T_AOHMAIN AS H where H.F_Customer='${token.customer}' order by H.F_ID desc) aex
ORDER BY Ready desc;`
			);
			res.json(result.recordset);
		} catch (err) {
			res.json(err);
		}

		return pool.close();
	} catch (err) {
		if (err) {
			console.log(err);
			res.status(403).json({ err: 403, msg: "Invalid Token" });
			return;
		}
	}

	res.status(200).json({ msg: "success" });
}
