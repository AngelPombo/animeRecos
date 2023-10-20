const {getDB} = require("../../database/db");


async function getTopRatedEntriesByCategory (req,res){
    try{

        const {category} = req.params;

        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,200),"...") AS content, e.video_url, e.category, e.id, e.genre, e.create_date, COUNT(vo.id) AS votos
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                LEFT JOIN votes vo ON e.id = vo.entry_id
                WHERE e.category=?
                GROUP BY e.id
              
            `,
            [category]
        );
        
        

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
       
        noBannedEntries.sort((a, b) => b.votos - a.votos);

        connect.release();

        res.status(200).send({
            status: "OK",
            data: noBannedEntries
        });

    }catch(e){
        console.log(e)
    }

}



module.exports = getTopRatedEntriesByCategory;