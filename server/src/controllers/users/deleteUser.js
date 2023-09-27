const {getDB} = require('../../database/db');
const {v4: uuidv4} = require('uuid');
const userCode = uuidv4();

async function deleteUser(req,res){
    try {
        const { idUser } = req.params;
        const connect = await getDB();
        const idCurrentUser = req.userInfo.id;

        if(parseInt(idUser) !== idCurrentUser){
            connect.release();

            return res.status(401).send({
                status: "No autorizado",
                message: 'No estás autorizado para eliminar este usuario'
            });
        }

        await connect.query(
            `
                UPDATE users
                SET pwd="[borrado]", user_name=?, avatar=null, active_user= 0, deleted=1, last_auth_update=?
                WHERE id=?
            `,
            [userCode, new Date(),idUser]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: `El usuario con id #${idUser} ha sido eliminado`
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteUser;