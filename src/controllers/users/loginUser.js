const {getDB} = require('../../database/db');
const jwt = require('jsonwebtoken');

async function loginUser (req,res){
    try{
        const connect = await getDB();

        const {email, pwd} = req.body;

        if(!email || !pwd){
            return res.status(400).send('Faltan datos.');
        }

        const [user] = await connect.query(
            `
                SELECT id, user_role, active_user
                FROM users
                WHERE email=? AND pwd=SHA2(?, 512)
            `,
            [email, pwd]
        );

        if(!user.length){
            return res.status(404).send('Usuario y/o contraseña incorrecto/s');
        }

        const info = {
            id: user[0].id,
            role: user[0].role
        }

        const token = jwt.sign(info, process.env.SECRET_TOKEN, {expiresIn: '1d'});

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Login',
            data: {
                token
            }
        });
    }catch(e){
        console.log(e);
    }
};

module.exports = loginUser;