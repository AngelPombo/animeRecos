const {getDB} = require('../../database/db');

async function voteEntry(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry} = req.params;
        const idUser = req.userInfo.id;

        const [entry] = await connect.query(
            `
                SELECT user_id
                FROM entries
                WHERE id=?
            `,
            [idEntry]
        );

        if(entry[0].user_id === idUser){
            connect.release();

            return res.status(403).send({
                status: "Acción no permitida",
                message: 'No puedes votar tu propia entrada'
            });
        }

        const [liked] = await connect.query(
            `
                SELECT v.vote_entry
                FROM entries e
                INNER JOIN votes v ON v.entry_id = e.id
                WHERE e.id=?
              
            `,
            [idEntry]
        );

        const [existingVote] = await connect.query(
            `
                SELECT id
                FROM votes
                WHERE user_id=? AND entry_id=?
            `,
            [idUser,idEntry]
        );
       

        if(existingVote.length > 0){

            if( liked[0].vote_entry === 1){
                await connect.query(
                    `
                        UPDATE votes 
                        SET vote_date =?, vote_entry =? ,  user_id =?, entry_id =?
                        WHERE id = ?
                    `,
                    [new Date(),0,idUser,idEntry, existingVote[0].id ]
                );

            }else{
                await connect.query(
                    `
                        UPDATE votes 
                        SET vote_date =?, vote_entry =? ,  user_id =?, entry_id =?
                        WHERE id = ?
                    `,
                    [new Date(),1,idUser,idEntry, existingVote[0].id ]
                );
            }
            
        } else {  
            await connect.query(
                `
                    INSERT INTO votes (vote_date, vote_entry ,  user_id, entry_id)
                    VALUES (?,?,?,?)
                `,
                [new Date(),1,idUser,idEntry]
            );
        }

        const [suma] = await connect.query(
            `
                SELECT SUM(v.vote_entry) AS "votos_totales"
                FROM entries e
                INNER JOIN votes v ON (v.entry_id = e.id)
                WHERE e.id=?
              
            `,
            [idEntry]
        );
        const [votado] = await connect.query(
            `
                SELECT v.vote_entry
                FROM entries e
                INNER JOIN votes v ON v.entry_id = e.id
                WHERE e.id=?
              
            `,
            [idEntry]
        );



        connect.release();
    
        res.status(200).send({
            status: 'OK',
            message: 'Entrada votada correctamente',
            data: {
                votos_totales: suma[0].votos_totales,
                votado: votado[0].vote_entry
            }
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = voteEntry;