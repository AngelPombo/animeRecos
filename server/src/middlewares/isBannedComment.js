async function isBannedComment (req,res,next){
    try{
        const bannC = req.infoComment.banned;

        if(bannC === 1){
            return res.status(401).send({
                status: 'No autorizado',
                message: 'El comentario se encuentra actualmente baneado'
            });
        }

        next();
    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isBannedComment;