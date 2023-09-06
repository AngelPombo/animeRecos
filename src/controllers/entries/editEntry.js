const {getDB} = require("../../database/db");



async function editEntry (req,res) {
    try{

        const {idEntry} = req.params;
        const connect = await getDB();

        const { title, content, video, category, genre, animeCharacter} = req.body;

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

        const [editedEntry] = await connect.query(
            `
                UPDATE entries 
                SET last_update = ?,title = ?, content = ?, video_url = ?, anime_character = ?, category = ?, genre = ?
                WHERE id = ?
            `,
            [new Date(), title, content, video, animeCharacter, category, genre, idEntry] 
        );

        connect.release();
        
        res.status(200).send({
            status: "OK",
            data: editedEntry
        });

    } catch(e){
        console.log(e);
    }
}

module.exports = editEntry;