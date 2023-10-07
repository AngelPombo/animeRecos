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
            connect.release();

            return res.status(404).send({
                status: "Imagen no encontrada",
                message: "La imagen seleccionada ya ha sido eliminada previamente"
            })
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
            message: 'Imagen eliminada',
            idPhotoDeleted: idPhoto,
            idEntryOfPhoto: idEntry
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = deletePhotoEntry;