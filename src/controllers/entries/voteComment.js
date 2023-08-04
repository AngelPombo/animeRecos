const {getDB} = require('../../database/db');

async function voteComment(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry, idComment} = req.params;
        const idUser = req.userInfo.id;
        

       
      
        const [comment] = await connect.query(
            `
                SELECT c.user_id
                FROM comments c 
                INNER JOIN entries e ON e.id = c.entry_id
                WHERE c.id=?
            `,
            [idComment]
        );


        if(comment[0].user_id === idUser){
            return res.status(403).send('No puedes votar tu propio comentario');
        }

     
        const [existingVote] = await connect.query(
            `
                SELECT id
                FROM votes
                WHERE user_id=? AND comment_id=?
            `,
            [idUser,idComment]
        );

        if(existingVote.length > 0) return res.status(403).send('Ya votaste este comentario');

       
        await connect.query(
            `
                INSERT INTO votes (vote_date, vote_comment ,  user_id, comment_id)
                VALUES (?,?,?,?)
            `,
            [new Date(),1,idUser,idComment]
        );

        
        const [suma] = await connect.query(
            `
                SELECT SUM(v.vote_comment) AS "votos_totales"
                FROM comments c
                INNER JOIN votes v ON (v.comment_id = c.id)
                WHERE c.id=?
            `,
            [idComment]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Comentario votado correctamente',
            data: {
                votos_totales: suma[0].votos_totales,
                id_entrada: idEntry
            }
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = voteComment;