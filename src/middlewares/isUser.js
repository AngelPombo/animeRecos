const {getDB} = require('../database/db');
const jwt = require('jsonwebtoken');

async function isUser (req,res,next){
    try{
        const connect = await getDB();
        const auth = req.headers['auth'];

        if(!auth){
            connect.release();

            return res.status(401).send('Falta cabecera de autorización.');
        }

        let tokenInfo;

        try{
            tokenInfo = jwt.verify(auth, process.env.SECRET_TOKEN);
        }catch(e){
            connect.release();
            return res.status(401).send('Token inválido.');
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
        const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
        const timeStampCreateToken = new Date(tokenInfo.iat * 1000);

        if(timeStampCreateToken < lastAuthUpdate){
            connect.release();
            
            res.status(401).send('Ha caducado el token. Debe volver a identificarse');
        }

        req.userInfo = tokenInfo;

        connect.release();

    }catch(e){
        console.log(e);
    }finally{
        next();
    }

    
}

module.exports = isUser;