const router = require("express").Router();
const Joi =require('@hapi/joi');
const bcrypt=require('bcryptjs');
const {registerValidate, loginValidate} = require('../validation');
const User = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();

async function dataExists(data){
   const fnd = await User.findOne(data);
   if(fnd)
      return true;
   return false;
}

router.post('/register', async (req,res)=>{
   let registerInfo = req.body;
   try{
      const validated = await registerValidate(registerInfo);
      if(!validated){
         res.status(400).send('Invalid Entry');
      }
      const {username, email, phoneNumber} = registerInfo;
      if(!username && !email && !username && !phoneNumber){
         res.status(400).send('Please enter a username then enter either an email or phone number or both');//TEST THIS 12/20
      }
      let fnd=false;
      fnd=dataExists({username:registerInfo.username });

      //unrolled loop
      if(!fnd)
         fnd=dataExists({email:registerInfo.email});
      if(!fnd)
         fnd=dataExists({phoneNumber:registerInfo.phoneNumber});
      if(fnd){
         res.status(400).send("Some of the provided info is already in use. Cannot make another account");
         return;
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      registerInfo.password=hashPassword;
      registerInfo.dateCreated=new Date();
      const newUser = new User(registerInfo);
      //check if e-mail exists or user existss
      await newUser.save();
      console.log('registered', registerInfo);
      res.send("Success"); //send login page for redirection 
   }
   catch(e){
      console.log('error:', e);
      res.status(400).json({error:e});
   }
});

//need to test jsontoken to see if it remains in the req.userId even after new requests. If so, then we don't need to store it into client
router.post('/login', async (req,res) => {
   try{
      const {error} = loginValidate(req.body);
      if(error) res.status(400).send('Invalid entry');

      const {username} =req.body;
      const isEmailRe=/.*@.*/;
      let user;
      if(isEmailRe.test(username)){
         user=await User.findOne({email:username})
       }else{
         user = await User.findOne({username:username});
         if(!user)
            user = await User.findOne({phoneNumber:username})
       }
      if(!user) res.status(404).send("E-mail not found");

      const validPass = bcrypt.compare(req.body.password, User.password);
      if(!validPass) res.status(400).send('Invalid password'); 

      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET) //creates token using the secret and appends id as payload
      res.set('auth-token', token).send(token);
   }
   catch(e){
      
   }
});    

 module.exports = router;
