const {getDB} = require('../../database/db');

async function getComments (req,res){
    try{
        const connect = await getDB();
        const {idEntry} = req.params;
        
        const [comments] = await connect.query(
            `SELECT c.id AS comment_id, c.comment_date, c.edited, c.content AS comment_content, c.banned AS comment_banned, u.id AS user_id, u.user_name, u.avatar, u.user_badge
                FROM comments AS c
                INNER JOIN users AS u ON c.user_id = u.id
                WHERE c.entry_id = ?`, [idEntry]
        );

        if(!comments.length){
            connect.release();

            return res.status(404).send({
                status: `No se han encontrado comentarios`,
                message: 'No hay comentarios'
            });
        }

        comments.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: comments
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getComments;