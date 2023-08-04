const {getDB} = require("../../database/db");



async function editComment (req,res) {
    try{

        const {idEntry, idComment} = req.params;
        const connect = await getDB();

        const {comment} = req.body;
        const idUser = req.userInfo.id; 

        
        if(!comment) return res.status(400).send("El campo comment es obligatorio");
        

        const [editedComment] = await connect.query(
            `
                UPDATE comments 
                SET edited = true , content = ?, user_id = ?
                WHERE entry_id = ?
            `,
            [comment, idUser, idEntry] 
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