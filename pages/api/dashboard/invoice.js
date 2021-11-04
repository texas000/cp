const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);

    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);

        let pool = new sql.ConnectionPool(process.env.SERVER2);

        //`SELECT TOP 100 * FROM [jwisql].[dbo].[T_OIHMAIN] FULL OUTER JOIN [jwisql].[dbo].[T_OIMMAIN] ON T_OIMMAIN.F_ID=T_OIHMAIN.F_OIMBLID WHERE T_OIHMAIN.F_Customer='10' ORDER BY T_OIMMAIN.F_ID DESC;`
        try {
            await pool.connect();
            let result = await pool
                .request()
                .query(
                    `SELECT TOP 100 * FROM [dbo].[T_INVOHD] WHERE F_BillTo='${token.customer}' AND (F_InvoiceAmt-F_PaidAmt<>0) ORDER BY F_ID DESC;`
                );
            res.json(result.recordset);
        } catch (err) {
            res.json(err);
        }

        return pool.close();
    } catch (err) {
        if (err) {
            console.log(err);
            res.status(403).json({ err: 403, msg: 'Invalid Token' });
            return;
        }
    }

    res.status(200).json({ msg: 'success' });
}
