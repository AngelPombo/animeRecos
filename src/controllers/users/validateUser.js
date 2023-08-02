const {getDB} = require('../../database/db');

async function validateUser(req,res) {
    try{

        const connect = await getDB();
        const {regCode} = req.params;

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE reg_code=?
            `,
            [regCode]
        );

        if(user.length === 0){
            return res.status(404).send('No existe ningún usuario con ese código');
        }

        await connect.query(
            `
                UPDATE users
                SET active_user=true, reg_code=null
                WHERE reg_code=?
            `,
            [regCode]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario activado correctamente.'
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = validateUser;