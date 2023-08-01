const {getDB} = require("../../database/db");


async function getTopRatedEntriesByCategory (req,res){
    try{

        const {category} = req.params;
        console.log(category);
        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT u.user_name, u.avatar, e.title, CONCAT(SUBSTRING(e.content,1,50),"...") AS content,e.genre, e.create_date
                FROM entries e
                INNER JOIN users u ON u.id=e.user_id
                WHERE e.category=?
            `,
            [category]
        );

        const [votesEntry] = await connect.query(
            `
                SELECT count(vo.id) AS "votos", e.id
                FROM votes vo
                INNER JOIN entries e ON vo.entry_id=e.id
                GROUP BY e.id
            `
        );

        connect.release();

        res.status(200).send({
            status: "OK",
            data: [entries, votesEntry]
        });

    }catch(e){
        console.log(e)
    }

}



module.exports = getTopRatedEntriesByCategory;