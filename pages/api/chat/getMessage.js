const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const { user } = req.query;
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);
    if (!user) {
        res.status(404).json({ err: 404, msg: 'Not Found' });
        return;
    }
    // if (auth !== process.env.API_KEY) {
    // 	res.status(401).json({ err: 401, msg: "Unauthorized" });
    // 	return;
    // }

    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        let pool = new sql.ConnectionPool(process.env.SERVER5);
        try {
            await pool.connect();
            let result = await pool.request().query(
                `SELECT M.ID, M.CREATE_DATE, M.MESSAGE_BODY, R.IS_READ, M.CREATOR_ID,
				(SELECT displayName from [dbo].[USER] where M.CREATOR_ID=uid) AS NAME,
				(SELECT photoURL from [dbo].[USER] where M.CREATOR_ID=uid) AS PHOTO
					FROM [dbo].[MESSAGE_RECIPIENT] AS R
					LEFT JOIN [MESSAGE] AS M ON M.ID=R.MESSAGE_ID 
					WHERE (R.RECIPIENT_ID='${user}' AND M.CREATOR_ID='${token.uid}') OR (R.RECIPIENT_ID='${token.uid}' AND M.CREATOR_ID='${user}')`
            );
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
