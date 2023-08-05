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

        if(comment.length === 0) return res.status(404).send('El comentario no existe');

        const objCommentInfo = {
            banned: comment[0].banned,
            id: comment[0].id
        }

        connect.release();

        req.infoComment = objCommentInfo;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = commentExists;