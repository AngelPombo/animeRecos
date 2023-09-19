const {getDB} = require('../../database/db');
const jwt = require('jsonwebtoken');

async function loginUser (req,res){
    try{
        const connect = await getDB();

        const {email, pwd} = req.body;

        if(!email || !pwd){
            connect.release();

            return res.status(400).send({
                status:'Faltan datos.',
                message: 'Es obligatorio introducir email y contraseña'
            });
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
            connect.release();

            return res.status(404).send({
                status: 'No autorizado',
                message: 'Usuario y/o contraseña incorrecto/s'
            })
        }

        const info = {
            id: user[0].id,
            role: user[0].role,
            active: user[0].active_user
        }

        if(!info.active){
            connect.release();
            
            return res.status(401).send({
                status:'Pendiente de activación',
                message:'El usuario no ha validado su cuenta'
            })
        }

        const token = jwt.sign(info, process.env.SECRET_TOKEN, {expiresIn: '1d'});

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Login',
            data: {
                token,
                email
            },
            info 
        });
    }catch(e){
        console.log(e);
    }
};

module.exports = loginUser;