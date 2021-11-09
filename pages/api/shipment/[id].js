const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const { id, q } = req.query;
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);

    if (!q) {
        res.status(404).json({ err: 404, msg: 'Not Found' });
    }
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        let pool = new sql.ConnectionPool(process.env.SERVER2);
        var isContainer = false;
        var houseTable, blid;
        var querys = '';
        switch (q.toUpperCase()) {
            case 'OIM':
                querys = `select *, (select T_COMPANY.F_SName from T_COMPANY where T_COMPANY.F_ID = M.F_Carrier) as CARRIER from T_OIMMAIN as M where F_RefNo='${id}';`;
                houseTable = 'T_OIHMAIN';
                blid = 'F_OIMBLID';
                isContainer = 'T_OIMCONTAINER';
                break;
            case 'OEX':
                querys = `select *, (select T_COMPANY.F_SName from T_COMPANY where T_COMPANY.F_ID = M.F_Carrier) as CARRIER from T_OOMMAIN as M where F_RefNo='${id}';`;
                houseTable = 'T_OOHMAIN';
                blid = 'F_OOMBLID';
                isContainer = 'T_OOMCONTAINER';
                break;
            case 'AIM':
                querys = `select *, (SELECT F_Name FROM T_CODEAIRLINE WHERE T_CODEAIRLINE.F_Prefix=SUBSTRING(M.F_MawbNo, 1, 3)) AS CARRIER from T_AIMMAIN as M where F_RefNo='${id}';`;
                houseTable = 'T_AIHMAIN';
                blid = 'F_AIMBLID';
                break;
            case 'AEX':
                querys = `select *, (select T_CODEAIRLINE.F_Name from T_CODEAIRLINE where T_CODEAIRLINE.F_ID = M.F_Carrier) as CARRIER from T_AOMMAIN as M where F_RefNo='${id}';`;
                houseTable = 'T_AOHMAIN';
                blid = 'F_AOMBLID';
                break;
            default:
                res.status(404).json({ error: true, status: 404, msg: 'Not Found' });
                return;
                break;
        }
        try {
            await pool.connect();
            let master = await pool.request().query(querys);
            let house = await pool
                .request()
                .query(
                    `SELECT *, (select T_COMPANY.F_SName from T_COMPANY where T_COMPANY.F_ID=H.F_Customer) as CUSTOMER FROM ${houseTable} AS H WHERE ${blid}='${master.recordset[0].F_ID}';`
                );
            if (isContainer) {
                isContainer = await pool
                    .request()
                    .query(`select * from ${isContainer} WHERE ${blid}='${master.recordset[0].F_ID}'`);
            }
            if (house.recordset[0].F_Customer === token.customer) {
                res.status(200).send({
                    master: master.recordset[0],
                    house: house.recordset || [],
                    container: isContainer.recordset || [],
                });
            } else {
                res.status(401).json({ error: true, status: 401, msg: 'Unauthroized' });
            }
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
