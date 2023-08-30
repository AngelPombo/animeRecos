async function isBannedComment (req,res,next){
    try{
        const bannC = req.infoComment.banned;

        if(bannC === 1){
            return res.status(401).send('No es posible acceder a este contenido. El comentario está baneado');
        }

    }catch(e){
        console.log(e);
    }finally{
        next();
    }
}

module.exports = isBannedComment;