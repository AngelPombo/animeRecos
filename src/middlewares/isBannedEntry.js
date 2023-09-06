async function isBannedEntry (req,res,next){
    try{
        const bannE = req.infoEntry.banned;

        if(bannE === 1){
            return res.status(401).send('No es posible acceder a este contenido. La entrada está baneada');
        }

        next();

    }catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = isBannedEntry;