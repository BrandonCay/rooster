const Joi = require('@hapi/joi');



function registerValidate (data){
    const schema={
        userName: Joi.string().required(),
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required(),
        phoneNumber:Joi.string().phoneNumber(),
        DoB:Joi.string().date() //date range will be determined 
    }
    return Joi.validate(data, schema);
}

function loginValidate(date){
 const schema={
     userName:Joi.string().required(),
     password:Joi.string().min(6).required()
 }
 return Joi.validate(data,schema);
}

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;