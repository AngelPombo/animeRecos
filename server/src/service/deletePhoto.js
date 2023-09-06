const fs = require('fs/promises');
const path = require('path');

async function deletePhoto (photo, directory){
    
    const dir = process.env.UPLOADS_DIRECTORY;

    const photoPath = path.join(__dirname,dir+directory, photo);

    await fs.unlink(photoPath);
};

module.exports = deletePhoto;