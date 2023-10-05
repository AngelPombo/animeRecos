const {getDB} = require('../../database/db');

async function getOneEntry (req,res) {
    try{

        const {idEntry} = req.params;
        const id = req.headers['id'];

        const connect = await getDB();

        const [entry] = await connect.query(
            `
                SELECT u.user_name, u.id AS user_id, u.avatar, u.user_badge, e.id AS entry_id,e.create_date, e.last_update, e.edited,e.banned, e.title, e.content, e.video_url, e.anime_character, e.genre, e.category
                FROM entries e
                INNER JOIN users u ON e.user_id=u.id
                WHERE e.id=?
            `,
            [idEntry]
        );


        if(!entry.length){
            connect.release();

            return res.status(400).send({
                status: 'Error',
                message: 'Ha intentado acceder a una entrada que no existe'
            });
        }

        const [comments] = await connect.query(
            `
                SELECT c.comment_date, c.content, c.edited, c.banned
                FROM comments c
                INNER JOIN entries e ON c.entry_id=?
                GROUP BY c.id
            `,
            [idEntry]
        );

        const [photos] = await connect.query(
            `
                SELECT p.id AS "photo_id", p.photo AS "name_photo"
                FROM photos p
                INNER JOIN entries e ON p.entry_id=?
                WHERE p.entry_id
                GROUP BY p.id
            `,
            [idEntry]
        );

        const [votesEntry] = await connect.query(
            `
                SELECT SUM (vo.vote_entry) AS "votos_entrada"
                FROM votes vo
                WHERE vo.entry_id=?
            `,
            [idEntry]
        );

        let likedByUser;

        if(id){
            const [resLiked] = await connect.query(
                `
                    SELECT vote_entry AS "vote_user"
                    FROM votes
                    WHERE user_id=? AND entry_id=?
                `,[id, idEntry]
            );

            if(resLiked.length > 0){
                likedByUser = resLiked[0].vote_user;
            }else{
                likedByUser = 0;
            }

            
        }

        const [votesComent] = await connect.query(
            `
                SELECT SUM(vo.vote_comment) AS "votos_comentario", c.id AS "id_comentario"
                FROM votes vo
                INNER JOIN comments c ON vo.comment_id=c.id
                WHERE c.entry_id=? 
                GROUP BY c.id
            `,
            [idEntry]
        );

        connect.release();

        res.status(200).send({
            status: "OK",
            data: [entry, comments, photos, votesEntry, votesComent, likedByUser]
        });
    } catch(e){
        console.log(e);
    }
} 


module.exports = getOneEntry;