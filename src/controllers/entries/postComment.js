const {getDB} = require("../../database/db");



async function postComment (req,res) {
    try{
        const connect = await getDB();

        const {idEntry} = req.params;
        const {comment} = req.body;
        const idUser = req.userInfo.id;

        if(!comment){
            connect.release();

            res.status(400).send('El campo comment es obligatorio');
        }
        
        const[newComment] = await connect.query (
            `
            INSERT INTO comments (comment_date, content, user_id, entry_id)
                VALUES (?,?,?,?)
            `,
            [new Date(), comment, idUser,idEntry ]
        
            );

        connect.release();

        res.status(200).send({
            status: "OK",
            message: "Comentario creado correctamente",
            data: newComment
        });
    } catch (e){
        console.log(e)
    }
}

module.exports = postComment;