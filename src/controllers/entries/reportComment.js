const {getDB} = require('../../database/db');

async function reportEntry(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry, idComment} = req.params;
        const idCurrentUser = req.userInfo.id;
        const {type, content} = req.body;
        
      
        const [reportedComment] = await connect.query(
            `
            SELECT user_id
            FROM comments
            WHERE id=?
            `,
            [idComment]
                
        );
            

        if(reportedComment[0].user_id === idCurrentUser){
            return res.status(403).send('No puedes reportar tu propio comentario');
        }

     
        const [existingReport] = await connect.query(
            `
                SELECT r.comment_id
                FROM reports r 
                WHERE r.comment_id=? AND r.report_user=?
            `,
            [idComment,idCurrentUser]
        );

        if(existingReport.length > 0) return res.status(403).send('Ya reportaste este comentario');

        if(!type){
            return res.status(400).send('Es obligatorio introducir el tipo de reporte');
        }
       
        const [report] = await connect.query(
            `
                INSERT INTO reports (report_date, report_user, comment_id, report_type, report_content)
                VALUES (?,?,?,?,?)
            `,
            [new Date(),idCurrentUser,idComment,type,content]
        );

        
        const [count] = await connect.query(
            `
                SELECT COUNT(r.id) AS "reports_totales"
                FROM reports r
                INNER JOIN comments c ON (c.id = r.comment_id)
                WHERE r.comment_id = ?
            `,
            [idComment]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Comentario reportado correctamente',
            data: {
                reports_totales: count[0].reports_totales,
                id_entrada: idEntry,
                id_comentario_reportado: idComment,
                id_usuario_reportador: idCurrentUser,
                type: report[0].report_type,
                content: report[0].report_content
            }
        });
        

    } catch (error) {
        console.log(error);
    }

}

module.exports = reportEntry;