import sql from 'mssql';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
export default async function (req, res) {
    if (!req.body) {
        res.status(404).send('NO BODY');
    }
    const { username, password } = JSON.parse(req.body);
    // console.log(username);
    const safeUsername = username.replace("'", "''");
    const safePassword = password.replace("'", "''");

    let pool = new sql.ConnectionPool(process.env.SERVER5);
    const query = `SELECT TOP 1 * FROM [dbo].[USER] WHERE email='${safeUsername}' AND password='${safePassword}';`;
    try {
        await pool.connect();
        let result = await pool.request().query(query);
        if (result.rowsAffected[0]) {
            res.status(200).send(
                cookie.serialize('jwitracking', jwt.sign({ ...result.recordset[0] }, process.env.JWT_KEY))
            );
        } else {
            res.status(403).send('ERROR');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    return pool.close();
}
export const config = {
    api: {
        externalResolver: true,
    },
};
