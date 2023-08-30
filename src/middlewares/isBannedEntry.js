async function isBannedEntry (req,res,next){
    try{
        const bannE = req.infoEntry.banned;

        if(bannE === 1){
            return res.status(401).send('No es posible acceder a este contenido. La entrada está baneada');
        }

    }catch(e){
        console.log(e);
    }finally{
        next();
    }
}

module.exports = isBannedEntry;