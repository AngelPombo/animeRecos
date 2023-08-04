const {getDB} = require('../database/db');

const userExists = async (req,res,next) => {
    try {
        const {idUser} = req.params;
        const connect = await getDB();

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE id=?
            `,
            [idUser]
        );
        
        if(user.length === 0){
            res.status(404).send('No existe el usuario');
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

module.exports = userExists;