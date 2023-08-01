const {getDB} = require('../../database/db');

async function getOneEntry (req,res) {
    try{

        const {idEntry} = req.params;

        const connect = await getDB();

        const [entry] = await connect.query(
            `
                SELECT u.user_name, u.avatar, e.last_update, e.edited, e.title, e.content, e.anime_character, e.genre, e.category
                FROM entries e
                INNER JOIN users u ON e.user_id=u.id
                WHERE e.id=?
            `,
            [idEntry]
        );

        const [coments] = await connect.query(
            `
                SELECT c.coment_date, c.content, c.edited
                FROM coments c
                INNER JOIN entries e ON c.entry_id=?
            `,
            [idEntry]
        );

        const [photos] = await connect.query(
            `
                SELECT p.id
                FROM photos p
                INNER JOIN entries e ON p.entry_id=?
            `,
            [idEntry]
        );

        const [videos] = await connect.query(
            `
                SELECT vi.id
                FROM videos vi
                INNER JOIN entries e ON vi.entry_id=?
            `,
            [idEntry]
        );

        const [votesEntry] = await connect.query(
            `
                SELECT count(vo.id) AS "votos"
                FROM votes vo
                INNER JOIN entries e ON vo.entry_id=?
            `,
            [idEntry]
        );

        const [votesComent] = await connect.query(
            `
                SELECT count(vo.id) AS "votos"
                FROM votes vo
                INNER JOIN coments c ON vo.coment_id=c.id
                WHERE c.entry_id=?
            `,
            [idEntry]
        );

        connect.release();
        res.status(200).send({
            status: "OK",
            data: [entry, coments, photos, videos, votesEntry, votesComent]
        });
    } catch(e){
        console.log(e);
    }
} 


module.exports = getOneEntry;