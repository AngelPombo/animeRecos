const getDB = require('../../database/db');

async function getLastEntries (_req,res){
    try{
        const connect = await getDB();
        
        const [entries] = await connect.query(
            `
                SELECT *
                FROM entries
            `
        );

        entries.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

        const lastEntries = [];
        for (let i = 0; i <= 10; i++) {
            if(!entries[i]){
                break;
            }else{
                lastEntries.push(entries[i]);
            }
        }
        
        res.status(200).send({
            status: 'OK',
            data: lastEntries
        });

    }catch(e){
        console.log(e);
    }
}

module.exports = getLastEntries;