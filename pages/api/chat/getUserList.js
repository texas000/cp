const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);
    // if (!user) {
    // 	res.status(404).json({ err: 404, msg: "Not Found" });
    // 	return;
    // }
    // if (auth !== process.env.API_KEY) {
    // 	res.status(401).json({ err: 401, msg: "Unauthorized" });
    // 	return;
    // }

    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        var qry;
        // console.log(token.admin);
        if (token.admin) {
            qry = `SELECT * FROM dbo.[USER] WHERE uid<>'p7ixY3zCjOQ0Kq67ABHqySvhQVh2';`;
        } else {
            qry = `SELECT * FROM dbo.[USER] WHERE uid='p7ixY3zCjOQ0Kq67ABHqySvhQVh2';`;
        }
        let pool = new sql.ConnectionPool(process.env.SERVER5);
        try {
            await pool.connect();
            let result = await pool.request().query(qry);
            res.json(result.recordset);
        } catch (err) {
            res.json(err);
        }
        return pool.close();
    } catch (err) {
        if (err) {
            res.status(403).json({ err: 403, msg: 'Invalid Token' });
            return;
        }
    }

    res.status(200).json({ msg: 'success' });
}
