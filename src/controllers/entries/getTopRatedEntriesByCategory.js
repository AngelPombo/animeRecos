const {getDB} = require("../../database/db");


async function getTopRatedEntriesByCategory (req,res){
    try{

        const {category} = req.params;

        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, u.user_badge, e.title, e.banned, CONCAT(SUBSTRING(e.content,1,50),"...") AS content,e.genre, e.create_date
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                WHERE e.category=?
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

        const [votesEntry] = await connect.query(
            `
                SELECT count(vo.id) AS "votos", e.id AS "id_entry", u.user_name, u.avatar, u.user_badge, e.title, CONCAT(SUBSTRING(e.content,1,50),"...") AS content, e.genre, e.create_date
                FROM votes vo
                INNER JOIN entries e ON vo.entry_id=e.id
                INNER JOIN users u ON e.user_id=u.id
                GROUP BY e.id
            `
        );

        votesEntry.sort((a, b) => b.votos - a.votos);

        connect.release();

        res.status(200).send({
            status: "OK",
            data: votesEntry
        });

    }catch(e){
        console.log(e)
    }

}



module.exports = getTopRatedEntriesByCategory;