const {getDB} = require('../../database/db');

async function bannEntry (req,res){
    try{
        const connect = await getDB();
        const {idEntry} = req.params;

        const [entry] = await connect.query(
            `
                SELECT id, banned
                FROM entries
                WHERE id=?
            `,
            [idEntry]
        );

        const [banned] = await connect.query(
            `
                UPDATE entries
                SET banned = 1
                WHERE id = ?
            `,
            [idEntry]
        );

        connect.release();

        return res.status(200).send({
            status: "OK",
            message: 'La entrada ha sido baneada correctamente',
            data: banned
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = bannEntry;