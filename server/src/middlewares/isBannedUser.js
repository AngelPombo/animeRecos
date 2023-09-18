async function isBannedUser (req,res,next){
    try{
        const bannU = req.userInfo.banned;
        
        if(bannU === 1){
            return res.status(401).send({
                status: 'No autorizado',
                message: 'Usuario baneado'
            });
        }

        next();

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isBannedUser;