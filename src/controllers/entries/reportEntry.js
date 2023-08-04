const {getDB} = require('../../database/db');

async function reportEntry(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry} = req.params;
        const idCurrentUser = req.userInfo.id;
        
      
        const [report] = await connect.query(
            `
            SELECT user_id
            FROM entries
            WHERE id=?
            `,
            [idEntry]
                
        );
            

        if(report[0].user_id === idCurrentUser){
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

        if(existingReport.length > 0) return res.status(403).send('Ya reportaste a esta entrada');

       
        await connect.query(
            `
                INSERT INTO reports (report_date, report_user, entry_id)
                VALUES (?,?,?)
            `,
            [new Date(),idCurrentUser,idEntry]
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
                id_usuario_reportador: idCurrentUser
            }
        });
        

    } catch (error) {
        console.log(error);
    }

}

module.exports = reportEntry;