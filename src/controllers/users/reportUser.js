const {getDB} = require('../../database/db');

async function reportUser(req,res) {
    try {
        const connect = await getDB();
        
        const {idUser} = req.params;
        const idCurrentUser = req.userInfo.id;
        
      
        const [report] = await connect.query(
            `
            SELECT id
            FROM users
            WHERE id = ?
            `,
            [idUser]
                
        );
            

        if(report[0].id === idCurrentUser){
            return res.status(403).send('No puedes reportar tu propia cuenta');
        }

     
        const [existingReport] = await connect.query(
            `
                SELECT r.user_id
                FROM reports r 
                WHERE r.user_id=? AND r.report_user=?
            `,
            [idUser,idCurrentUser]
        );

        if(existingReport.length > 0) return res.status(403).send('Ya reportaste a este usuario');

       
        await connect.query(
            `
                INSERT INTO reports (report_date, report_user, user_id)
                VALUES (?,?,?)
            `,
            [new Date(),idCurrentUser,idUser]
        );

        
        const [count] = await connect.query(
            `
                SELECT COUNT(r.id) AS "reports_totales"
                FROM reports r
                INNER JOIN users u ON (u.id = r.user_id)
                WHERE r.user_id = ?
            `,
            [idUser]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario reportado correctamente',
            data: {
                reports_totales: count[0].reports_totales,
                id_usuario_reportado: idUser,
                id_usuario_reportador: idCurrentUser
            }
        });
        

    } catch (error) {
        console.log(error);
    }

}

module.exports = reportUser;