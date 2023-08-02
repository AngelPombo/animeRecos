const {getDB} = require('../../database/db');

async function postNewUser (req,res){
    try{
        const {email, pwd, nick} = req.body;

        const connect = await getDB();

        const [userExist] = await connect.query(
            `SELECT id FROM users WHERE email=?`,[email]
        );

        if(userExist.length > 0){
            return res.status(409).send({
                status: 'ERROR',
                message: 'El usuario ya existe'
            });
        }

        const {v4: uuidv4} = require('uuid');
        const regCode = uuidv4();

        const bodyMail = `
            ¡Bienvenide a animeRecos!
            Para finalizar el proceso de registro, utiliza el siguiente enlace para activar tu cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `;

        const sendMail = require('../../service/sendMail');
        const subject = 'Correo de verificación de cuenta - animeRecos';
        
        sendMail(email, subject, bodyMail);
        
        const [users] = await connect.query(
            `INSERT INTO users (user_name, email, pwd, reg_code) VALUES (?,?,SHA2(?,512),?)`,[nick,email,pwd,regCode]
        );

        connect.release();

        return res.status(200).send({
            status: 'OK',
            message: 'Usuario creado correctamente'
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = postNewUser;