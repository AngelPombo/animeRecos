const {getDB} = require('../database/db');

const commentExists = async (req,res,next) => {
    let connect;
    
    try {
        connect = await getDB();
        
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

            return res.status(404).send({
                status: 'Not found',
                message: 'El comentario al que desea acceder no existe'
            });
        } 

        const objCommentInfo = {
            banned: comment[0].banned,
            id: comment[0].id
        }

        req.infoComment = objCommentInfo;

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
};

module.exports = commentExists;