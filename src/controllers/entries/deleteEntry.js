const {getDB} = require('../../database/db');
const deletePhoto = require('../../service/deletePhoto');

async function deleteEntry (req,res){
    try {
        const connect = await getDB();
        const {idEntry} = req.params;

      
        const [photos] = await connect.query(
            `
                SELECT photo
                FROM photos
                WHERE entry_id=?
            `,
            [idEntry]
        );

 
        await connect.query(`DELETE FROM photos WHERE entry_id=?`,[idEntry]);

     
        for(let item of photos){
            await deletePhoto(item.photo,'/photoentries');
        }

     
        await connect.query(
            `
                DELETE FROM votes WHERE entry_id=?
            `,
            [idEntry]
        );

     
        await connect.query(`DELETE FROM entries WHERE id=?`,[idEntry]);

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: `La entrada con id ${idEntry} y todos sus elementos fueron eliminados`
        });

    } catch (error) {
        console.log(error);
    }
}
module.exports = deleteEntry;