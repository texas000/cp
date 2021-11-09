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
        WITH Paging AS(SELECT *, ROW_NUMBER() OVER (ORDER BY F_InvoiceDate DESC) NUM FROM(
        SELECT * FROM T_INVOHD WHERE F_BillTo='${token.customer}'
        ) FRE)
        SELECT * FROM Paging WHERE NUM BETWEEN ${(page - 1) * 10 + 1} AND ${page * 10} ORDER BY F_InvoiceDate DESC;`;
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
