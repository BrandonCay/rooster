const JoiOriginal= require('@hapi/joi');
const Joi = JoiOriginal.extend(require('joi-phone-number'));
 

function registerValidate (data){
    const schema= Joi.object({
        username: Joi.string().min(4).max(15).allow(''),
        name:Joi.string(),
        email:Joi.string().email(),
        password:Joi.string().min(6).required(),
        phoneNumber:Joi.string().allow(''),
        DoB:Joi.date() //date range will be determined 
    })
    return schema.validate(data);
}

function loginValidate(data){
 const schema= Joi.object({ 
     username:Joi.string().required(),
     password:Joi.string().min(6).required()
 })
 return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;