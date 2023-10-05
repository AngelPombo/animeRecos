const {getDB} = require('../../database/db');

async function voteEntry(req,res) {
    try {
        const connect = await getDB();
        
        const {idEntry} = req.params;
        const idUser = req.userInfo.id;

        const [currentUserVote] = await connect.query(
            `
                SELECT id AS "id_vote", vote_entry AS "votado"
                FROM votes
                WHERE user_id=? AND entry_id=?

            `,[idUser, idEntry]
        );


        if(currentUserVote.length > 0){
            if(currentUserVote[0].votado === 1){
                await connect.query(
                    `
                        UPDATE votes 
                        SET vote_date=?, vote_entry=?, user_id=?, entry_id=?
                        WHERE id = ?
                    `,
                    [new Date(),0,idUser,idEntry,currentUserVote[0].id_vote]
                );

                const [suma] = await connect.query(
                    `
                        SELECT SUM(v.vote_entry) AS "votos_totales"
                        FROM entries e
                        INNER JOIN votes v ON v.entry_id = e.id
                        WHERE e.id=?
                    `,
                    [idEntry]
                );

                connect.release();

                return res.status(200).send({
                    status: 'OK',
                    message: 'Se ha eliminado el voto de la entrada correctamente',
                    data: {
                        id_vote: currentUserVote[0].id_vote,
                        user: idUser,
                        votado: 0,
                        votos_totales_entrada: suma[0].votos_totales,
                        
                    }
                });

            }else if(currentUserVote[0].votado === 0){
                await connect.query(
                    `
                        UPDATE votes 
                        SET vote_date=?, vote_entry=?, user_id=?, entry_id=?
                        WHERE id = ?
                    `,
                    [new Date(),1,idUser,idEntry,currentUserVote[0].id_vote]
                );

                const [suma] = await connect.query(
                    `
                        SELECT SUM(v.vote_entry) AS "votos_totales"
                        FROM entries e
                        INNER JOIN votes v ON (v.entry_id = e.id)
                        WHERE e.id=?
                    `,
                    [idEntry]
                );

                connect.release();

                return res.status(200).send({
                    status: 'OK',
                    message: 'Se ha votado la entrada correctamente',
                    data: {
                        id_vote: currentUserVote[0].id_vote,
                        user: idUser,
                        votado: 1,
                        votos_totales_entrada: suma[0].votos_totales,
                    }
                });
            }
        }

        const [newVote] = await connect.query(
            `
                INSERT INTO votes (vote_date, vote_entry, user_id, entry_id)
                VALUES (?,?,?,?)
            `,[new Date(),1,idUser,idEntry]
        );

        const {insertId} = newVote;


        const [suma] = await connect.query(
            `
                SELECT SUM(v.vote_entry) AS "votos_totales"
                FROM entries e
                INNER JOIN votes v ON (v.entry_id = e.id)
                WHERE e.id=?
            `,
            [idEntry]
        );

        connect.release();
    
        res.status(200).send({
            status: 'OK',
            message: 'Entrada votada correctamente',
            data: {
                id_vote: insertId,
                user: idUser,
                votado: 1,
                votos_totales_entrada: suma[0].votos_totales
                
            }
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = voteEntry;