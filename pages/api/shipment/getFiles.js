const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    // IF THERE IS QUERY STRING
    const { ref } = req.query;
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);

    try {
        // GET TOKEN FROM COOKIE
        // console.log(cookies.jwitracking);
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        if (!token || !ref) {
            res.status(400).send();
            return;
        }
        // CREATE SQL POOL CONNECTION
        let pool = new sql.ConnectionPool(process.env.SERVER21);
        try {
            // WAIT TIL POOL CONNECT
            await pool.connect();
            // GET RESULT FROM SQL QUERY
            let result = await pool
                .request()
                .query(`SELECT * FROM T_FILE WHERE F_REF='${ref}' AND F_SECURITY='10' ORDER BY F_ID DESC;`);

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
