const {getDB} = require('../../database/db');
const savePhoto = require('../../service/savePhoto');
const sendMail = require('../../service/sendMail');
const {v4: uuidv4} = require('uuid');

async function updateUser (req,res){
    try{
        const {idUser} = req.params;
        const {nick, email, bio, linkTwitter, linkYoutube, linkInsta, linkTtv} = req.body;

        const connect = await getDB();

        if(!nick || !email){
            connect.release();

            return res.status(400).send({
                status:"Faltan datos",
                message: "Debe introducir email y nombre de usuario"
            });
        }

        if(req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin"){
            connect.release();

            return res.status(401).send('No está autorizado para modificar este usuario');
        }

        const [user] = await connect.query(
            `SELECT id,email,biography,link_twitter,link_youtube,link_insta,link_ttv FROM users WHERE id=?`, [idUser]
        );

        if(req.files && req.files.avatar){
            const userAvatar = await savePhoto(req.files.avatar,'/avataruser');

            await connect.query(
                `
                    UPDATE users
                    SET avatar = ?
                    WHERE id = ?
                `,
                [userAvatar,idUser]
            )
        }

        if(email && (email !== user[0].email)){

            const [existingEmail] = await connect.query(
                `
                    SELECT id
                    FROM users
                    WHERE email=?
                `,
                [email]
            );

            if(existingEmail.length > 0){
                connect.release();

                return res.status(409).send('Ya existe un usuario registrado con ese email')
            }

            const regCode = uuidv4();

            const bodyMail = `
            Has modificado tu dirección de correo electrónico en animeRecos.
            Pulsa el siguiente enlace para validar tu correo: ${process.env.PUBLIC_HOST}${regCode}
            `;

            const subject = 'Confirma tu nuevo correo';

            await sendMail(email,subject,bodyMail);

            await connect.query(
                `
                    UPDATE users
                    SET user_name=?,email=?,last_auth_update=?,active_user=0,reg_code=?
                    WHERE id=?
                `,
                [nick, email, new Date(), regCode, idUser]
            );
            
            connect.release();

            return res.status(200).send({
                status: 'OK',
                message: 'Datos de usuario actualizados correctamente. Se ha enviado un correo electrónico para validar el email.'
            });
        }

        const [userUpdate] = await connect.query(
            `
            UPDATE users
            SET user_name=?, email=?, biography=?, link_twitter=?, link_youtube=?, link_insta=?, link_ttv=?
            WHERE id=?
            `,
            [nick,email,bio,linkTwitter,linkYoutube,linkInsta,linkTtv,idUser]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario modificado correctamente.'
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = updateUser;