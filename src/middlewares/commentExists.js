const {getDB} = require('../database/db');

const commentExists = async (req,res,next) => {
    try {
        const connect = await getDB();
        
        const {idComment} = req.params;

        const [comment] = await connect.query(
            `
                SELECT id
                FROM comments
                WHERE id = ?
            `,
            [idComment]
        );

        connect.release();

        if(comment.length === 0) return res.status(404).send('El comentario no existe');

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = commentExists;