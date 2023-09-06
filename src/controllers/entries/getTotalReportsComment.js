const {getDB} = require('../../database/db');

async function getTotalReportsComment (req,res){
    try{
        const connect = await getDB();
        const {idEntry, idComment} = req.params;

        const [totalReports] = await connect.query(
            `
                SELECT c.id AS "id_comment", c.content, u.id AS "id_autor", u.user_name AS "autor_nick", r.id AS "id_report", r.report_date, r.report_user AS "reportado_por_user", r.report_type, r.report_content
                FROM reports r
                INNER JOIN comments c ON r.comment_id=c.id
                INNER JOIN users u ON c.user_id=u.id
                WHERE c.id=? AND c.entry_id=? 
            `,
            [idComment, idEntry]
        );

        totalReports.sort((a, b) => new Date(b.report_date) - new Date(a.report_date));

        if(totalReports.length === 0){
            connect.release();
            
            return res.status(404).send({
                status: 'Sin reports',
                message: 'No se han encontrado reports para este comentario',
                id_entry_of_comment: idEntry,
                id_comment: idComment
            })
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            id_entry_of_comment: idEntry,
            data: totalReports
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = getTotalReportsComment;