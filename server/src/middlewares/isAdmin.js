
async function isAdmin (req,res,next){
    try{
        const role = req.userInfo.role;

        if(role !== 'admin'){
            return res.status(401).send({
                status: 'No autorizado',
                message: 'Sólo los administradores tienen acceso a este contenido'
            });
        }
        next();
    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isAdmin;