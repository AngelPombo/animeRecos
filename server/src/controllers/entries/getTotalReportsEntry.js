const {getDB} = require('../../database/db');

async function getTotalReportsEntry (req,res){
    try{
        const connect = await getDB();
        const {idEntry} = req.params;

        const [totalReports] = await connect.query(
            `
                SELECT e.id AS "id_entry", e.title, e.content, u.id AS "id_autor", u.user_name AS "autor_nick", r.id AS "id_report", r.report_date, r.report_user AS "reportado_por_user", r.report_type, r.report_content
                FROM reports r
                INNER JOIN entries e ON r.entry_id=e.id
                INNER JOIN users u ON e.user_id=u.id
                WHERE e.id=?
            `,
            [idEntry]
        );

        totalReports.sort((a, b) => new Date(b.report_date) - new Date(a.report_date));

        if(totalReports.length === 0){
            connect.release();
            
            return res.status(404).send({
                status: 'Sin reports',
                message: 'No se han encontrado reports para esta entrada',
                id_entry: idEntry
            })
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: totalReports
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = getTotalReportsEntry;