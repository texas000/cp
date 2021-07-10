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
				WITH Paging AS(SELECT TOP 100 ROW_NUMBER() OVER(ORDER BY T_OIMMAIN.F_ID DESC) AS NUM, 
				T_OIMMAIN.F_RefNo, T_OIMMAIN.F_ETA, T_OIMMAIN.F_ETD, T_OIMMAIN.F_FETA,
				T_OIMMAIN.F_LoadingPort, T_OIMMAIN.F_DisCharge, T_OIMMAIN.F_FinalDest,
				T_OIHMAIN.F_CustRefNo FROM jwisql.dbo.T_OIHMAIN 
				FULL OUTER JOIN [jwisql].[dbo].[T_OIMMAIN] ON T_OIMMAIN.F_ID=T_OIHMAIN.F_OIMBLID where F_Customer='10')
				SELECT * FROM Paging where NUM BETWEEN ${(id - 1) * 10 + 1} AND ${id * 10};`
			);
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
