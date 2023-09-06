const {getDB} = require('../../database/db');

async function getLastEntries (_req,res){
    try{
        const connect = await getDB();
        
        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, e.id AS "entry_id", CONCAT(SUBSTRING(e.content,1,50),"...") AS content, e.video_url, e.category, e.create_date
                FROM users u
                INNER JOIN entries e ON u.id=e.user_id
            `
        );

        let photos = [];
        let infoPhotos = [];
        
        for (let i = 0; i < entries.length; i++) {

            photos[i] = await connect.query(
                `
                    SELECT p.photo, p.entry_id
                    FROM photos p
                    WHERE entry_id=?
                `,[entries[i].entry_id]
            )

            infoPhotos[i] = photos[i][0];
        }


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
                    lastEntries[i].photos_info = infoPhotos[i];
                }  
            }
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            entries: [lastEntries]
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getLastEntries;