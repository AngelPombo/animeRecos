const {getDB} = require("../../database/db");
const savePhoto = require('../../service/savePhoto');


async function postEntry (req,res) {
    try{

        const connect = await getDB();

        const { title, content, category, genre, animeCharacter, video} = req.body;

        const idUser = req.userInfo.id; 

        if(!title){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio introducir un título"
            });
        } 
        if(!content){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio escribir el contenido"
            });
        } 
        if(!category){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio seleccionar una categoría"
            });
        } 
        if(!genre){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "Es obligatorio seleccionar un género"
            });
        } 
        
        const categoryValues = ["recomendaciones", "teorias", "fanArt",
        "openings", "cosplays", "memes"];

        let categoryExists = null;

        for (let i = 0; i < categoryValues.length; i++) {
            if(categoryValues[i] === category){
                categoryExists = categoryValues[i];
            }
            
        }

        if(categoryExists === null){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "La categoría no se corresponde con ninguna de las disponibles"
            });
        }

        const genreValues = ["accion", "aventura", "deportes",
        "comedia", "drama", "fantasia",
        "musical","romance", "ciencia-ficcion",
        "sobrenatural", "thriller", "terror",
        "psicologico", "infantil", "otros"];

        let genreExists = null;

        for (let i = 0; i < genreValues.length; i++) {
            if(genreValues[i] === genre){
                genreExists = genreValues[i];
            }
            
        }

        if(genreExists === null){
            connect.release();

            return res.status(400).send({
                status: 'Faltan datos',
                message: "El género no se corresponde con ninguno de los disponibles"
            });
        }

        const [newEntry] = await connect.query(
            `
                INSERT INTO entries (create_date, title, content, video_url, anime_character, category, genre, user_id)
                VALUES (?,?,?,?,?,?,?,?)
            `,
            [new Date(), title, content, video, animeCharacter, category, genre, idUser] 
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
        }

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