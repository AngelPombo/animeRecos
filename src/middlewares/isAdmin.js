
async function isAdmin (req,res,next){
    try{
        const role = req.userInfo.role;

        if(role !== 'admin'){
            return res.status(401).send('No puedes acceder a este contenido si no eres un administrador');
        }
        
    }catch(e){
        console.log(e);
    }finally{
        next();
    }
}

module.exports = isAdmin;