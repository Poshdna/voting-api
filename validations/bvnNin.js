const Joi = require('joi');

const validateBvnNin = (data) => {

    const bvnNinSchema = Joi.object({
        bvnOrNin: Joi.string().required(),
        type: Joi.string().required().allow('bvn', 'nin'),
        phone: Joi.string().required(),
        // bvn: Joi.when('type', {
        //     is:  'bvn',
        //     then: Joi.string().required().min(11).max(11),
        // }),
        // nin: Joi.when('type', {
        //      is:  'nin',
        //     then: Joi.string().required().min(15).max(15),
        // }),
    });
    return bvnNinSchema.validate(data);
}
 
module.exports = validateBvnNin;