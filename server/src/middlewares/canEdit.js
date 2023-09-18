const {getDB} = require('../database/db');

const canEdit = async (req,res,next) => {
    let connect;

    try {
        connect = await getDB();
        const {idEntry} = req.params;

        const [entry] = await connect.query(
            `
                SELECT user_id
                FROM entries
                WHERE id=?
            `,
            [idEntry]
        );

        if(req.userInfo.id !== entry[0].user_id && req.userInfo.role !== 'admin'){
            connect.release();

            return res.status(401).send({
                status: 'No autorizado',
                message: 'No tiene permisos para modificar esta entrada'
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

module.exports = canEdit;