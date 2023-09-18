const {getDB} = require('../database/db');
const jwt = require('jsonwebtoken');

async function isUser (req,res,next){
    let connect;

    try{
        connect = await getDB();
        const auth = req.headers['auth'];

        if(!auth){

            return res.status(401).send({
                status: 'No autorizado',
                message: 'Falta cabecera de autorización'
            });
        }

        let tokenInfo;

        try{
            tokenInfo = jwt.verify(auth, process.env.SECRET_TOKEN);
        }catch(e){

            return res.status(401).send({
                status: 'No autorizado',
                message: 'Token inválido'
            });
        }

        const [user] = await connect.query(
            `
                SELECT last_auth_update,user_role,banned
                FROM users
                WHERE id=?
            `,
            [tokenInfo.id]
        );

        tokenInfo.banned = user[0].banned;
        tokenInfo.role = user[0].user_role;

        const lastAuthUpdate = new Date(user[0].last_auth_update);
        const timeStampCreateToken = new Date(tokenInfo.iat * 1000);

        if(timeStampCreateToken < lastAuthUpdate){
            let error = new Error('Ha caducado el token. Debe volver a identificarse');
            error.code = 401;
            throw error;
        }

        req.userInfo = tokenInfo;

        next();

    }catch(e){
        console.log(e);
        next(e);
    }finally{
        if(connect){
            connect.release();
        }
    }
}

module.exports = isUser;