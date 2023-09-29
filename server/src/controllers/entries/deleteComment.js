const {getDB} = require('../../database/db');

async function deleteComment (req,res){
    try {
        const connect = await getDB();
        const {idComment} = req.params;

        await connect.query(
            `
                DELETE FROM votes WHERE comment_id=?
            `,
            [idComment]
        );

        await connect.query(`DELETE FROM comments WHERE id=?`,[idComment]);

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: `El comentario ha sido eliminado`,
            idComment: idComment
        });

    } catch (error) {
        console.log(error);
    }
}
module.exports = deleteComment;