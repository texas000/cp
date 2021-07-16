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
	const { id } = req.query;

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		let pool = new sql.ConnectionPool(process.env.SERVER2);

		try {
			await pool.connect();
			let result = await pool.request().query(
				`
				WITH Paging AS(SELECT *, ROW_NUMBER() OVER (ORDER BY F_ETA DESC) NUM FROM(
					SELECT 'OIM' as Type, M.F_RefNo, M.F_ETD, M.F_ETA, M.F_FETA, M.F_LoadingPort as F_LOADING, M.F_DisCharge as F_DISCHARGE, M.F_FinalDest as F_FINAL, H.F_CustRefNo as F_CUST FROM T_OIHMAIN as H INNER JOIN T_OIMMAIN AS M ON(M.F_ID=H.F_OIMBLID) WHERE H.F_Customer='${
						token.customer
					}'
					UNION ALL
					SELECT 'OEX' as Type, M.F_RefNo, M.F_ETD, M.F_ETA, NULL as F_FETA, M.F_LoadingPort as F_LOADING, M.F_DisCharge as F_DISCHARGE, H.F_FinalDest as F_FINAL, H.F_ExPref as F_CUST FROM T_OOHMAIN as H INNER JOIN T_OOMMAIN AS M ON(M.F_ID=H.F_OOMBLID) WHERE H.F_Customer='${
						token.customer
					}'
					UNION ALL
					SELECT 'AIM' as Type, M.F_RefNo, M.F_ETD, M.F_ETA, NULL as F_FETA, M.F_LoadingPort as F_LOADING, M.F_Discharge as F_DISCHARGE, NULL as F_FINAL, H.F_CustRefNo as F_CUST FROM T_AIHMAIN as H INNER JOIN T_AIMMAIN AS M ON(M.F_ID=H.F_AIMBLID) WHERE H.F_Customer='${
						token.customer
					}'
					UNION ALL
					SELECT 'AEX' as Type, M.F_RefNo, M.F_ETD, M.F_ETA, NULL as F_FETA, M.F_LoadingPort as F_LOADING, M.F_Discharge as F_DISCHARGE, NULL as F_FINAL, H.F_ExpRefNo as F_CUST FROM T_AOHMAIN as H INNER JOIN T_AOMMAIN AS M ON(M.F_ID=H.F_AOMBLID) WHERE H.F_Customer='${
						token.customer
					}'
				) FRE)
				SELECT * FROM Paging WHERE NUM BETWEEN ${(id - 1) * 10 + 1} AND ${
					id * 10
				} ORDER BY F_ETA DESC;`
			);
			// WITH Paging AS(SELECT TOP 100 ROW_NUMBER() OVER(ORDER BY M.F_ID DESC) AS NUM,
			// 	M.F_RefNo, M.F_ETA, M.F_ETD, M.F_FETA,
			// 	M.F_LoadingPort, M.F_DisCharge, M.F_FinalDest,
			// 	H.F_CustRefNo FROM T_OIHMAIN AS H
			// 	FULL OUTER JOIN T_OIMMAIN AS M ON M.F_ID=H.F_OIMBLID where F_Customer='${
			// 		token.customer
			// 	}')
			// 	SELECT * FROM Paging where NUM BETWEEN ${(id - 1) * 10 + 1} AND ${id * 10};
			res.json(result.recordset);
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

// DECLARE @PageNumber AS INT
// DECLARE @RowsOfPage AS INT
// SET @PageNumber=2
// SET @RowsOfPage=4
// SELECT FruitName,Price FROM SampleFruits
// ORDER BY Price
// OFFSET (@PageNumber-1)*@RowsOfPage ROWS
// FETCH NEXT @RowsOfPage ROWS ONLY
