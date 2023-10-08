const {getDB} = require ('../../database/db');

const savePhoto = require ("../../service/savePhoto");

async function addPhotoEntry (req, res){
    try {
        const {idEntry} = req.params;
        const connect = await getDB();
        
        if(req.files && (req.files.img || req.files.img2 || req.files.img3)){
            if(req.files && Object.keys(req.files).length > 0){
                for(let photoData of Object.values(req.files).slice(0,3)){
                    const photoName =  await savePhoto(photoData, "/photoentries");
                    await connect.query(
                        `
                            INSERT INTO photos (photo, entry_id)
                            VALUES (?,?)
                        `,
                        [photoName, idEntry]
                    )
                }
            }

            const [newPhotos] = await connect.query(
                `
                    SELECT photo AS name_photo, id AS photo_id
                    FROM photos
                    WHERE entry_id = ?
                `,[idEntry]
            )

            connect.release();

            return res.status(200).send({
                status: 'OK',
                message: 'La imagen se cargó correctamente',
                newPhotos: newPhotos
            });
        }else{
            connect.release();

            return res.status(404).send({
                status:"Faltan datos",
                message: 'No se ha enviado ninguna imagen'
            });
        }

    }catch(e){
        console.log(e);
    }
}
module.exports = addPhotoEntry;