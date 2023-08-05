const {getDB} = require('../../database/db');

async function getTotalReportsUser (req,res){
    try{
        const connect = await getDB();
        const {idUser} = req.params;

        const [totalReports] = await connect.query(
            `
                SELECT u.id AS "id_user", u.user_name, u.email, r.id AS "id_report", r.report_date, r.report_user AS "reportado_por_user", r.report_type, r.report_content
                FROM reports r
                INNER JOIN users u ON r.user_id=u.id
                WHERE u.id=?
            `,
            [idUser]
        );

        totalReports.sort((a, b) => new Date(b.report_date) - new Date(a.report_date));

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: totalReports
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = getTotalReportsUser;