const router = require("express").Router();
const Joi =require('@hapi/joi');
const bcrypt=require('bcryptjs');
const {registerValidate, loginValidate} = require('../validation');
const User = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();

router.post('/signup', async (req,res)=>{
   let registerInfo = res.body;
   try{
      const validated = await registerValidate(registerInfo);
      if(!validated){
         res.status(400).send('Invalid Entry');
      }
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      registerInfo.password=hashPassword;
      const newUser = new User(registerInfo);
      //check if e-mail exists or user existss
      await newUser.save();
   }
   catch(e){
      res.status(400).send(e);
   }
});

router.post('/login', async (req,res) =>{
   const {error} = loginValidate(req.body);
   if(error) res.status(400).send('Invalid entry');

   const user = await User.findOne({email:req.body.email});
   if(!user) res.status(404).send("E-mail not found");

   const validPass = bcrypt.compare(req.body.password, User.password);
   if(!validPass) res.status(400).send('Invalid password'); 

   const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET) //creates token using the secret and appends id as payload
   res.set('auth-token', token).send(token);
});    

 module.exports = router;
