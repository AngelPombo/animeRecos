const {getDB} = require("../../database/db");

async function getEntriesByCategory (req,res) {
    try{

        const {category} = req.params;
        
        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.id, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,50),"...") AS content, e.video_url, e.category, e.genre, e.create_date
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                WHERE category =?
            `,
            [category]
        );

        if(!entries.length){
            connect.release();

            return res.status(404).send({
                status: `No se han encontrado entradas de la categoría ${category}`,
                message: 'No hay entradas en esta categoría o la categoría no existe'
            });
        }
       
        let photos = [];
        let infoPhotos = [];
        
        for (let i = 0; i < entries.length; i++) {
            //console.log(entries[i].id)
            photos[i] = await connect.query(
                `
                    SELECT p.photo, p.entry_id
                    FROM photos p
                    WHERE entry_id=?
                `,[entries[i].id]
            )

            infoPhotos[i] = photos[i][0];
            //console.log(infoPhotos[i])
        }
       

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        if(!entries.length){
            connect.release();
            
            return res.status(400).send({
                status: 'Sin entradas',
                message: 'No hay entradas para mostrar'
            });
        }

        const noBannedEntries = [];

        for (let i = 0; i < entries.length; i++) {
            if(!entries[i]){
                break;
            }else{
                if(entries[i].banned === 0){
                    noBannedEntries.push(entries[i]);
                    for(let j = 0 ; j < infoPhotos.length; j++){
                        if(noBannedEntries[i].id===infoPhotos[j].entry_id){
                            noBannedEntries[i].photos_info = infoPhotos[j];
                        }
                    }
                   
                }  
            }
        }
        console.log(noBannedEntries)
       
        if(!noBannedEntries.length){
            connect.release();

            return res.status(400).send({
                status: 'Sin entradas (baneadas)',
                message: 'No hay entradas para mostrar'
            });
        }
     
        connect.release();

        res.status(200).send({
            status: "OK",
            data: noBannedEntries
        });

    } catch(e){
        console.log(e)
    }
}

module.exports = getEntriesByCategory;