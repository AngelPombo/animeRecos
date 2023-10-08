const { getDB } = require('../../database/db');

async function getLastUserEntries(req, res) {
    try {
        const { idUser } = req.params;

        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, e.id, CONCAT(SUBSTRING(e.content,1,200),"...") AS content, e.video_url, e.category, e.genre, e.create_date
                FROM entries e, users u
                WHERE u.id=? AND u.id=e.user_id
            `,
            [idUser]
        );

        if (!entries.length) {
            
            connect.release();

            return res.status(400).send({
                status: 'Not Found',
                message: 'Este usuario no ha publicado ninguna entrada'
            });
        }

        let photos = [];
        let infoPhotos = [];
        
        for (let i = 0; i < entries.length; i++) {

            photos[i] = await connect.query(
                `
                    SELECT p.photo, p.entry_id
                    FROM photos p
                    WHERE entry_id=?
                `,[entries[i].id]
            )

            if(photos[i][0].length > 0){
                infoPhotos[i] = photos[i][0];
            }

        }

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        let noBannedEntries = [];

        for (let i = 0; i < entries.length; i++) {
            if(!entries[i]){
                break;
            }else{
                if(entries[i].banned === 0){
                    noBannedEntries.push(entries[i]);
                    for(let j = 0 ; j < infoPhotos.length; j++){
                        if(infoPhotos[j]){
                            if(noBannedEntries[i].id===infoPhotos[j][0].entry_id){
                                noBannedEntries[i].photos_info = infoPhotos[j];
                            }
                        }                  
                    }
                } 
            }
        }
        
        if(!noBannedEntries.length){
            connect.release();

            return res.status(400).send({
                status: 'Sin entradas (baneadas)',
                message: 'No hay entradas para mostrar'
            });
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: noBannedEntries
        });

    } catch (e) {
        console.log(e);
    }
}

module.exports = getLastUserEntries;