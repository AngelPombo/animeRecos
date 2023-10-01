const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const uuid = require('uuid');

async function savePhoto(dataPhoto, dir){
    
    let img;

    if(dataPhoto.data){
        img = sharp(dataPhoto.data);
        const photoNameUniq = `${uuid.v4()}_${dataPhoto.name}`;

        await img.toFile(
        path.join(__dirname,process.env.UPLOADS_DIRECTORY+dir, photoNameUniq)
        );

        return photoNameUniq;
    }

    if(!dataPhoto.data){
        let img1;
        let img2;
        let img3;
        let photoNameUniq1;
        let photoNameUniq2;
        let photoNameUniq3;
        

        for (let i = 0; i < dataPhoto.length; i++) {
            if(i === 0){
                img1 = sharp(dataPhoto[i].data);
                photoNameUniq1 = `${uuid.v4()}_${dataPhoto[i].name}`;
                await img1.toFile(
                    path.join(__dirname,process.env.UPLOADS_DIRECTORY+dir, photoNameUniq1)
                ); 
            }
            if(i === 1){
                img2 = sharp(dataPhoto[i].data);
                photoNameUniq2 = `${uuid.v4()}_${dataPhoto[i].name}`;
                await img2.toFile(
                    path.join(__dirname,process.env.UPLOADS_DIRECTORY+dir, photoNameUniq2)
                );
            }
            if(i === 2){
                img3 = sharp(dataPhoto[i].data);
                photoNameUniq3 = `${uuid.v4()}_${dataPhoto[i].name}`;
                await img3.toFile(
                    path.join(__dirname,process.env.UPLOADS_DIRECTORY+dir, photoNameUniq3)
                );
            }
        }

        return photoNameUniq1, photoNameUniq2, photoNameUniq3;
    }

    
}


module.exports = savePhoto;