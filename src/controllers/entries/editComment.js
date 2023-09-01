const {getDB} = require("../../database/db");



async function editComment (req,res) {
    try{

        const {idEntry, idComment} = req.params;
        const connect = await getDB();

        const {comment} = req.body;
        const idUser = req.userInfo.id; 
        
        if(!comment){
            connect.release();

            return res.status(400).send("El campo comment es obligatorio");
        }

        const [idOwnerComment] = await connect.query(
            `
                SELECT user_id
                FROM comments
                WHERE id=? AND entry_id=?
            `,
            [idComment, idEntry]
        );

        if(idUser !== idOwnerComment[0].user_id && req.userInfo.role !== 'admin'){
            connect.release();

            return res.status(401).send('No tiene permisos para modificar este comentario');
        }

        const [editedComment] = await connect.query(
            `
                UPDATE comments 
                SET edited = true , content = ?, user_id = ?
                WHERE entry_id = ? AND id=?
            `,
            [comment, idUser, idEntry, idComment] 
        );

        connect.release();
        
        return res.status(200).send({
            status: "OK",
            data: editedComment
        });

    } catch(e){
        console.log(e)
    }
}

module.exports = editComment;