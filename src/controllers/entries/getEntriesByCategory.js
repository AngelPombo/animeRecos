const {getDB} = require("../../database/db");

async function getEntriesByCategory (req,res) {
    try{

        const {category} = req.params;
        
        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,50),"...") AS content,e.category, e.create_date
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                WHERE category =?
            `,
            [category]
        );

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        if(!entries.length){
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
                }  
            }
        }

        connect.release();

        if(!noBannedEntries.length){
            return res.status(400).send({
                status: 'Sin entradas (baneadas)',
                message: 'No hay entradas para mostrar'
            });
        }
        
        return res.status(200).send({
            status: "OK",
            data: noBannedEntries
        });

    } catch(e){
        console.log(e)
    }
}

module.exports = getEntriesByCategory;