const {getDB} = require("../../database/db");


async function getEntriesByGenre (req,res) {
    try{

        const {genre} = req.params;

        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,50),"...") AS content, e.video_url, e.category, e.create_date, e.genre
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                WHERE genre =?
            `,
            [genre]
        );

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        if(!entries.length){
            connect.release();

            return res.status(404).send({
                status: `No se han encontrado entradas del género ${genre}`,
                message: 'No hay entradas en este género o el género no existe',
                data: entries
            });
        }

        const noBannedEntries = [];

        for (let i = 0; i < entries.length; i++) {
            if(!entries[i]){
                break;
            }else{
                if(entries[i].banned === 0){
                    noBannedEntries.push(entries[i]);
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
            status: "OK",
            data: noBannedEntries
        });

    }catch(e){
        console.log(e);
    }
}


module.exports = getEntriesByGenre;