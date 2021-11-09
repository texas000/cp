const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const sql = require('mssql');

export default async function handler(req, res) {
    const { id } = req.query;
    const rawCookie = req.headers.cookie || '';
    const cookies = cookie.parse(rawCookie);
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        let pool = new sql.ConnectionPool(process.env.SERVER2);
        var querys = `SELECT TOP 1 T_INVOHD.*, 
        SHIPTO.F_SName as SHIP, SHIPTO.F_Addr as S_Addr,
        SHIPTO.F_City as S_City,SHIPTO.F_State as S_State,
        SHIPTO.F_ZipCode as S_ZipCode,SHIPTO.F_Country as S_Country,
        BILLTO.F_SName as BILL, BILLTO.F_Addr as B_Addr,
        BILLTO.F_City as B_City,BILLTO.F_State as B_State,
        BILLTO.F_ZipCode as B_ZipCode,BILLTO.F_Country as B_Country
        FROM 
         T_INVOHD 
        INNER JOIN
         T_COMPANY SHIPTO ON SHIPTO.F_ID=T_INVOHD.F_ShipTo
        INNER JOIN
         T_COMPANY BILLTO ON BILLTO.F_ID=T_INVOHD.F_BillTo
        WHERE F_InvoiceNo='${id}';`;
        try {
            await pool.connect();
            let invo = await pool.request().query(querys);
            if (invo.recordset.length) {
                // if (invo.recordset[0].F_BillTo == token.customer) {
                if (invo.recordset[0].F_BillTo == token.customer) {
                    let invoDetail = await pool.request().query(`
                    SELECT * FROM T_INVODETAIL WHERE F_INVOHDID='${invo.recordset[0].F_ID}';
                    `);
                    var house = [];
                    var master = {};
                    let main = await pool.request().query(`
                        SELECT * FROM ${invo.recordset[0].F_TBName} WHERE F_ID=${invo.recordset[0].F_TBID};
                        `);
                    if (invo.recordset[0].F_TBName != 'T_GENMAIN') {
                        house = main.recordset;
                        console.log(house[0]);
                        var isOIM = house[0].hasOwnProperty('F_OIMBLID');
                        var isOOM = house[0].hasOwnProperty('F_OOMBLID');
                        var isAIM = house[0].hasOwnProperty('F_AIMBLID');
                        var isAOM = house[0].hasOwnProperty('F_AOMBLID');
                        let freightMaster = await pool.request().query(`
                        SELECT * FROM ${
                            isOIM
                                ? 'T_OIMMAIN'
                                : isOOM
                                ? 'T_OOMMAIN'
                                : isAIM
                                ? 'T_AIMMAIN'
                                : isAOM
                                ? 'T_AOMMAIN'
                                : 'T_GENMAIN'
                        } WHERE F_ID=${
                            isOIM
                                ? house[0].F_OIMBLID
                                : isOOM
                                ? house.F_OOMBLID
                                : isAIM
                                ? house.F_AIMBLID
                                : isAOM
                                ? house.F_AOMBLID
                                : ''
                        };
                        `);

                        master = freightMaster.recordset[0];
                    } else {
                        master = main.recordset[0];
                    }

                    // var isOIM = house.recordset[0].hasOwnProperty('F_OIMBLID');
                    // var isOOM = house.recordset[0].hasOwnProperty('F_OOMBLID');
                    // var isAIM = house.recordset[0].hasOwnProperty('F_AIMBLID');
                    // var isAOM = house.recordset[0].hasOwnProperty('F_AOMBLID');
                    // let master = await pool.request().query(`
                    // SELECT * FROM ${
                    //     isOIM
                    //         ? 'T_OIMMAIN'
                    //         : isOOM
                    //         ? 'T_OOMMAIN'
                    //         : isAIM
                    //         ? 'T_AIMMAIN'
                    //         : isAOM
                    //         ? 'T_AOMMAIN'
                    //         : 'T_GENMAIN'
                    // } WHERE F_ID=${
                    //     isOIM
                    //         ? house.recordset[0].F_OIMBLID
                    //         : isOOM
                    //         ? house.recordset[0].F_OOMBLID
                    //         : isAIM
                    //         ? house.recordset[0].F_AIMBLID
                    //         : isAOM
                    //         ? house.recordset[0].F_AOMBLID
                    //         : ''
                    // };
                    // `);
                    // console.log(master);

                    res.status(200).send({
                        Invoice: invo.recordset[0],
                        Detail: invoDetail.recordset,
                        House: house,
                        Master: master,
                    });
                } else {
                    // Unautorized - Invoice cannot be acceesible to the customer
                    res.status(401).json({ error: true, status: 401, msg: 'Unauthroized' });
                }
            } else {
                res.status(404).json({ error: true, status: 404, msg: 'Not Found' });
            }
        } catch (err) {
            console.log(err);
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

export const config = {
    api: {
        externalResolver: true,
    },
};
