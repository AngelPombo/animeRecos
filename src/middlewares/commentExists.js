const {getDB} = require('../database/db');

const commentExists = async (req,res,next) => {
    try {
        const connect = await getDB();
        
        const {idComment} = req.params;

        const [comment] = await connect.query(
            `
                SELECT id, banned
                FROM comments
                WHERE id = ?
            `,
            [idComment]
        );

        if(comment.length === 0){
            connect.release();

            return res.status(404).send('El comentario no existe');
        } 

        const objCommentInfo = {
            banned: comment[0].banned,
            id: comment[0].id
        }

        req.infoComment = objCommentInfo;

        connect.release();

    } catch (error) {
        console.log(error);
    }finally{
        next();
    }
};

module.exports = commentExists;