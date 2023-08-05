const joi = require('@hapi/joi');

function validateDataUser(req,res,next){

    const schema = joi.object().keys({
        nick: joi.string().required(),
        email: joi.string().min(3).required().email(),
        pwd: joi.string().min(3).required()
    });

    const validation = schema.validate(req.body);

    if(validation.error){
        return res.status(400).send({
            status: 'No has enviado los datos correctamente',
            message: validation.error.message
        });
    }

    next();
}

module.exports = validateDataUser;