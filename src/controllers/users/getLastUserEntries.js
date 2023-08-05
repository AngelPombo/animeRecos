const { getDB } = require('../../database/db');

async function getLastUserEntries(req, res) {
    try {
        const { idUser } = req.params;

        const connect = await getDB();

        const [entries] = await connect.query(
            `
                SELECT e.title, CONCAT(SUBSTRING(e.content,1,50),"...") AS content,e.category, e.create_date
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

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        const lastEntries = [];

        for (let i = 0; i <= 3; i++) {
            if(!entries[i]){
                break;
            }else{
                lastEntries.push(entries[i]);
            }
        }

        connect.release();

        return res.status(200).send({
            status: 'OK',
            data: entries
        });

    } catch (e) {
        console.log(e);
    }
}

module.exports = getLastUserEntries;