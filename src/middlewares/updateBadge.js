const {getDB} = require('../database/db');

async function updateBadge(req,res,next){
    try {
        const connect = await getDB();
        
        const {idUser} = req.params;

        const [entries] = await connect.query(
            `
                SELECT count (id) AS "total_entradas"
                FROM entries 
                WHERE user_id = ?
            `,
            [idUser]
        );
        let numeroEntradas = entries[0].total_entradas

        console.log(numeroEntradas)
        if(numeroEntradas<5){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "Genin"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }else if(numeroEntradas>=5 && numeroEntradas<10){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "Chūnin"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }else if(numeroEntradas>=10 && numeroEntradas<15){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "Jōnin"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }else if(numeroEntradas>=15 && numeroEntradas<20){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "ANBU"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }else if(numeroEntradas>=20 && numeroEntradas<25){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "Sannin"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }else if(numeroEntradas>=25){
            await connect.query(
                `
                    UPDATE users
                    SET user_badge = "Kage"
                    WHERE id = ?
                `,
                [idUser]
            ); 
        }
   

        connect.release();
        

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = updateBadge;