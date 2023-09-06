"use-strict"

const {getDB} = require('../../database/db');
const sendMail = require('../../service/sendMail');

async function recoverPwd(req,res){
    try{

        const connect = await getDB();

        const {email} = req.body;

        if(!email){
            connect.release();

            return res.status(400).send('Es necesario ingresar el correo electrónico para esta acción');
        }

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE email=?
            `,
            [email]
        );

        if(!user.length || user.length === 0){
            connect.release();

            return res.status(404).send('El correo electrónico no está asociado a ningún usuario');
        }

        const {v4: uuidv4} = require('uuid');
        const recoverCode = uuidv4();

        await connect.query(
            `
                UPDATE users
                SET recover_code=?, last_auth_update=?
                WHERE id=?
            `,
            [recoverCode, new Date(), user[0].id]
        );

        const body = `
        Se solicitó un cambio de password para el usuario con email ${email} en animeRecos.
        El código de recuperación es ${recoverCode}
        Si no has sido tú, no utilices este código. Puedes entrar con tu password habitual.
        `;

        const subject = 'Cambio de contraseña - animeRecos';

        await sendMail(email,subject,body);

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Se ha enviado un código de recuperación de contraseña'
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = recoverPwd;