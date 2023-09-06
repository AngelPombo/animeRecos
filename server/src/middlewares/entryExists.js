const {getDB} = require('../database/db');

const entryExists = async (req,res,next) => {

    let connect;

    try {

        connect = await getDB();
        
        const {idEntry} = req.params;

        const [entry] = await connect.query(
            `
                SELECT id, banned
                FROM entries
                WHERE id = ?
            `,
            [idEntry]
        );

        if(entry.length === 0){
            connect.release();

            return res.status(404).send('La entrada a la que deseas acceder no existe');
        } 

        const objEntryInfo = {
            banned: entry[0].banned,
            id: entry[0].id
        }

        req.infoEntry = objEntryInfo;

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
};

module.exports = entryExists;