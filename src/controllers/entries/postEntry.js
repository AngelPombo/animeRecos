const {getDB} = require("../../database/db");
const savePhoto = require('../../service/savePhoto');


async function postEntry (req,res) {
    try{

        const connect = await getDB();

        const { title, content, category, genre, animeCharacter } = req.body;

        const idUser = req.userInfo.id; 

        if(!title){
            connect.release();

            return res.status(400).send("El campo title es obligatorio");
        } 
        if(!content){
            connect.release();

            return res.status(400).send("El campo content es obligatorio");
        } 
        if(!category){
            connect.release();

            return res.status(400).send("El campo category es obligatorio");
        } 
        if(!genre){
            connect.release();

            return res.status(400).send("El campo genre es obligatorio");
        } 


        const [newEntry] = await connect.query(
            `
                INSERT INTO entries (create_date, title, content, anime_character, category, genre, user_id)
                VALUES (?,?,?,?,?,?,?)
            `,
            [new Date(), title, content, animeCharacter, category, genre, idUser] 
        );

        const {insertId} = newEntry; 


        if(req.files && Object.keys(req.files).length > 0){
            for(let photoData of Object.values(req.files).slice(0,3)){
                const photoName =  await savePhoto(photoData, "/photoentries");
                await connect.query(
                    `
                        INSERT INTO photos (photo, entry_id)
                        VALUES (?,?)
                    `,
                    [photoName, insertId]
                )
            }
        }else(
            await connect.query(
            `
                INSERT INTO photos (photo, entry_id)
                VALUES ("sin foto",?)
            `,
            [insertId]
            )
        )

        connect.release();

        res.status(200).send({
            status: "OK",
            message: "Entrada creada correctamente",
            data: newEntry
        });
    } catch (e){
        console.log(e)
    }
}

module.exports = postEntry;