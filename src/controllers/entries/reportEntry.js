const {getDB} = require('../../database/db');

async function reportEntry(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry} = req.params;
        const idCurrentUser = req.userInfo.id;
        const {type, content} = req.body;

        const [reportedEntry] = await connect.query(
            `
            SELECT user_id
            FROM entries
            WHERE id=?
            `,
            [idEntry]
        );
            

        if(reportedEntry[0].user_id === idCurrentUser){
            connect.release();

            return res.status(403).send('No puedes reportar tu propia entrada');
        }


        const [existingReport] = await connect.query(
            `
                SELECT r.entry_id
                FROM reports r 
                WHERE r.entry_id=? AND r.report_user=?
            `,
            [idEntry,idCurrentUser]
        );

        if(existingReport.length > 0){
            connect.release();

            return res.status(403).send('Ya reportaste a esta entrada');
        } 

        if(!type){
            connect.release();

            return res.status(400).send('Es obligatorio introducir el tipo de reporte');
        }

        await connect.query(
            `
                INSERT INTO reports (report_date, report_user, entry_id, report_type, report_content)
                VALUES (?,?,?,?,?)
            `,
            [new Date(),idCurrentUser,idEntry,type,content]
        );

        
        const [count] = await connect.query(
            `
                SELECT COUNT(r.id) AS "reports_totales"
                FROM reports r
                INNER JOIN entries e ON (e.id = r.entry_id)
                WHERE r.entry_id = ?
            `,
            [idEntry]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Entrada reportada correctamente',
            data: {
                reports_totales: count[0].reports_totales,
                id_entrada_reportada: idEntry,
                id_usuario_reportador: idCurrentUser,
                type: type,
                content: content
                
            }
        });
        

    } catch (error) {
        console.log(error);
    }

}

module.exports = reportEntry;