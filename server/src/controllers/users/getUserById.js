const { getDB } = require('../../database/db');


async function getUserById(req, res) {
    try {
        const { idUser } = req.params;

        const connect = await getDB();

        const [user] = await connect.query(
            `
                SELECT u.user_name, u.email, u.pwd, u.id, u.avatar, u.user_badge, u.biography, u.link_twitter, u.link_youtube, u.link_insta, u.link_ttv, u.created_date
                FROM users u
                WHERE id=?
            `,
            [idUser]
        );

        if (!user.length) {
            
            connect.release();

            return res.status(400).send({
                status: 'Not Found',
                message: 'No se ha encontrado al usuario'
            });
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: user
        });

    } catch (e) {
        console.log(e);
    }
}

module.exports = getUserById;