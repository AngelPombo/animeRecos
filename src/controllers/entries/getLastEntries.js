const {getDB} = require('../../database/db');

async function getLastEntries (_req,res){
    try{
        const connect = await getDB();
        
        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,50),"...") AS content,e.category, e.create_date
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
            `
        );

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        if(!entries.length){
            connect.release();
            return res.status(400).send({
                status: 'Sin entradas',
                message: 'No hay entradas para mostrar'
            });
        }

        const lastEntries = [];

        for (let i = 0; i <= 9; i++) {
            if(!entries[i]){
                break;
            }else{
                if(entries[i].banned === 0){
                    lastEntries.push(entries[i]);
                }  
            }
        }
        connect.release();
        return res.status(200).send({
            status: 'OK',
            data: lastEntries
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getLastEntries;