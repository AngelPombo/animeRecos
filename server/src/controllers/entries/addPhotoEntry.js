const {getDB} = require ('../../database/db');

const savePhoto = require ("../../service/savePhoto");

async function addPhotoEntry (req, res){
    try {
        const {idEntry} = req.params;
        const connect = await getDB();
        
        if(req.files && req.files.img){

            if(req.files && Object.keys(req.files).length > 0){
                for(let photoData of Object.values(req.files).slice(0,3)){
                    console.log(photoData)
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

            connect.release();

            return res.status(200).send({
                status: 'OK',
                message: 'La imagen se cargó correctamente'
            });
        }else{
            connect.release();

            return res.status(401).send({
                status:"Faltan datos",
                message: 'El envío de la imagen es obligatorio'
            });
        }

    }catch(e){
        console.log(e);
    }
}
module.exports = addPhotoEntry;