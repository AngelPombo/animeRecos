const {getDB} = require('../database/db');

const userExists = async (req,res,next) => {
    let connect;

    try {
        const {idUser} = req.params;
        connect = await getDB();

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE id=?
            `,
            [idUser]
        );
        
        if(user.length === 0){
            connect.release();

            return res.status(404).send({
                status: 'Not found',
                message: 'El usuario no existe'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
}

module.exports = userExists;