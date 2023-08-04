const {getDB} = require ('../../database/db');

const savePhoto = require ("../../service/savePhoto");

async function addPhotoEntry (req, res){
    try {
        const {idEntry} = req.params;
        const connect = await getDB();

        if(req.files && req.files.img){
            
            const photoEntry = await savePhoto(req.files.img,'/photoentries');

            await connect.query(
                `
                    INSERT INTO photos (photo, entry_id)
                    VALUES (?,?)
                `,
                [photoEntry,idEntry]
            )

            return res.status(200).send({
                status: 'OK',
                message: 'La imagen se cargó correctamente'
            });
        }else{
            return res.status(409).send('El envío de la imagen es obligatorio')
        }

    }catch(e){
        console.log(e);
    } 
}
module.exports = addPhotoEntry;