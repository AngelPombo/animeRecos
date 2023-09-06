async function isBannedUser (req,res,next){
    try{
        const bannU = req.userInfo.banned;
        
        if(bannU === 1){
            return res.status(401).send('Permiso denegado. Has sido baneado por un administrador');
        }

        next();

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isBannedUser;