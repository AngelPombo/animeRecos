const {getDB} = require('../../database/db');

async function bannComment (req,res){
    try{
        const connect = await getDB();
        const {idEntry, idComment} = req.params;

        const [entry] = await connect.query(
            `
                SELECT id, banned
                FROM entries
                WHERE id=?
            `,
            [idEntry]
        );

        const [comment] = await connect.query(
            `
                SELECT id, banned
                FROM comments
                WHERE id=?   
            `,
            [idComment]
        );

        const [banned] = await connect.query(
            `
                UPDATE comments
                SET banned = 1
                WHERE id = ?
            `,
            [idComment]
        );

        connect.release();

        res.status(200).send({
            status: "OK",
            message: 'El comentario ha sido baneado correctamente',
            data: [entry, comment, banned]
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = bannComment;