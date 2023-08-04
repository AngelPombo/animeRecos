const {getDB} = require('../../database/db');
const deletePhoto = require('../../service/deletePhoto');

async function deletePhotoEntry(req,res) {
    try {
        const connect = await getDB();
        const {idEntry, idPhoto} = req.params;
       
        const [current] = await connect.query(
            `
                SELECT photo
                FROM photos
                WHERE id=? AND entry_id=?
            `,
            [idPhoto,idEntry]
        );
        
        if(current.length === 0){
            res.status(404).send('La imagen no existe')
        }

        
        await deletePhoto(current[0].photo,'/photoentries');

        
        await connect.query(
            `
                DELETE FROM photos
                WHERE id=? AND entry_id=?
            `,
            [idPhoto,idEntry]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Foto eliminada'
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = deletePhotoEntry;