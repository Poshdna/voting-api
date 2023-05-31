const Joi = require('joi');

const validateJoinUs = (data) => {
    
    const joinUsSchema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        othername: Joi.string(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        dob: Joi.string().required(),
        stateOfOrigin: Joi.string().required(),
        lga: Joi.string().required(),

    });
    return joinUsSchema.validate(data);
    

}

module.exports = validateJoinUs;


