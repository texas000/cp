const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const { page } = req.query;
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);

    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        if (!token) {
            res.status(401).json({ err: 401, msg: 'Unauthroized' });
        }
        let pool = new sql.ConnectionPool(process.env.SERVER2);
        var query = `
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
        SELECT * FROM Paging WHERE NUM BETWEEN ${(page - 1) * 10 + 1} AND ${page * 10} ORDER BY F_ETA DESC;`;

        try {
            await pool.connect();
            let result = await pool.request().query(query);
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(404).json({ error: true, status: 404, msg: 'Not Found' });
        }
        return pool.close();
    } catch (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: true, status: 500, msg: 'Server Error' });
            return;
        }
    }
}
