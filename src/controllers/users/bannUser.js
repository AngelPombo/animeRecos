const {getDB} = require('../../database/db');

async function bannUser (req,res){
    try{
        const connect = await getDB();
        const {idUser} = req.params;

        const [user] = await connect.query(
            `
                SELECT id, banned
                FROM users
                WHERE id=?
            `,
            [idUser]
        );

        if(user[0].banned === 1){
            connect.release();

            return res.status(400).send({
                status: 'Error',
                message: 'El usuario ya está baneado, en caso de que quiera desbanearlo, utilice la ruta correspondiente'
            });
        }

        const [banned] = await connect.query(
            `
                UPDATE users
                SET banned = 1
                WHERE id = ?
            `,
            [idUser]
        );

        connect.release();

        return res.status(200).send({
            status: "OK",
            message: 'El usuario ha sido baneado correctamente',
            data: banned
        });


    }catch(e){
        console.log(e);
    }
}

module.exports = bannUser;