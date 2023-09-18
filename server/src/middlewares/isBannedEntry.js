async function isBannedEntry (req,res,next){
    try{
        const bannE = req.infoEntry.banned;

        if(bannE === 1){
            return res.status(401).send({
                status: 'No autorizado',
                message: 'La entrada se encuentra actualmente baneada'
            });
        }

        next();

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isBannedEntry;