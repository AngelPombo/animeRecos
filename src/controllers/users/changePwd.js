const {getDB} = require('../../database/db');
const jwt = require('jsonwebtoken');

async function changePwd (req,res){
    try{
        const connect = await getDB();

        const {idUser} = req.params;
        const {oldPwd, newPwd} = req.body;
        const idCurrentUser = req.userInfo.id;

        if(parseInt(idUser) !== idCurrentUser){
            connect.release();

            return res.status(401).send('No estás autorizado para realizar este cambio de contraseña');
        }

        if(!oldPwd || !newPwd){
            connect.release();

            return res.status(400).send('Faltan datos');
        }

        const [user] = await connect.query(
            `SELECT id FROM users WHERE id=? AND pwd=SHA2(?,512)`, [idUser, oldPwd]
        );

        if(!user.length || user.length === 0){
            connect.release();

            return res.status(401).send('Las contraseñas no coinciden.');
        }

        await connect.query(
            `UPDATE users SET pwd=SHA2(?,512), last_auth_update=? WHERE id=?`,[newPwd,new Date(),idUser]
        );

/*         const token = req.headers.auth;

        jwt.destroy(token); */

        connect.release();
        
        res.status(200).send({
            status: 'OK',
            message: 'Contraseña actualizada correctamente. Es necesario volver a iniciar sesión.'
        });

    }catch(e){
        console.log(e);
    }
}

module.exports=changePwd;