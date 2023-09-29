const {getDB} = require("../../database/db");



async function postComment (req,res) {
    try{
        const connect = await getDB();

        const {idEntry} = req.params;
        const {comment} = req.body;
        const idUser = req.userInfo.id;

        if(!comment){
            connect.release();

            return res.status(400).send({
                status: "faltan datos",
                message: 'El contenido del comentario es obligatorio'
            });
        }
        
        const[newComment] = await connect.query (
            `
            INSERT INTO comments (comment_date, content, user_id, entry_id)
                VALUES (?,?,?,?)
            `,
            [new Date(), comment, idUser,idEntry ]
        
            ); 

            const {insertId} = newComment
        
        const[infoComment] = await connect.query (
            `
            SELECT c.id AS comment_id, c.comment_date, c.content AS comment_content, c.banned AS comment_banned, u.id AS user_id, u.user_name, u.avatar, u.user_badge
            FROM comments AS c
            INNER JOIN users AS u ON c.user_id = u.id
            WHERE c.entry_id = ? AND c.id=?
            `, 
            [idEntry, insertId]
            
            )

        connect.release();

        res.status(200).send({
            status: "OK",
            message: "Comentario creado correctamente",
            data: infoComment
        });
    } catch (e){
        console.log(e)
    }
}

module.exports = postComment;