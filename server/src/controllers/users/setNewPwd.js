"use-strict"

const {getDB} = require('../../database/db');

async function setNewPwd (req,res){
    try{

        const connect = await getDB();
        const {recoverCode, newPassword} = req.body;

        console.log(req.body);
        console.log(recoverCode);
        console.log(newPassword);

        if(!recoverCode || !newPassword || newPassword.length < 6){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE recover_code=?
            `,
            [recoverCode]
        );

        if(!user.length || user.length === 0){
            connect.release();

            return res.status(400).send({
                status: 'Código inválido',
                message: 'El código de recuperación introducido no es correcto'
            });
        }

        await connect.query(
            `
                UPDATE users
                SET pwd=SHA2(?,512), last_auth_update=?, recover_code=null
                WHERE id=?
            `,
            [newPassword, new Date(), user[0].id]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Se ha restablecido la contraseña correctamente'
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = setNewPwd;