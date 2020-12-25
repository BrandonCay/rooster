const router = require("express").Router();
const Joi =require('@hapi/joi');
const bcrypt=require('bcryptjs');
const {registerValidate, loginValidate} = require('../validation');
const User = require("../models/userModel");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

async function dataExists(data){
   const fnd = await User.findOne(data);
   console.log(fnd);
   if(fnd)
      return true;
   return false;
}

router.post('/register', async (req,res)=>{
   let registerInfo = req.body;
   try{
      const {error} = registerValidate(registerInfo);
      if(error){
         console.log(error);
         return res.status(400).send('Invalid Entry');
      }
      const {username, email, phoneNumber} = registerInfo;
      if(!username || (!email && !phoneNumber)){
        return res.status(400).send('Please enter a username then enter either an email or phone number or both');
      }
      let fnd=false;
      fnd=await dataExists({username:username });
      console.log(fnd);
      //unrolled loop
      if(!fnd && email)
         fnd= await dataExists({email:email});
         console.log(fnd);

      if(!fnd && phoneNumber)
         fnd=await dataExists({phoneNumber:phoneNumber});
         console.log(fnd);

      if(fnd){
         return res.status(400).send("Some of the provided info is already in use. Cannot make another account");
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
   console.log('logging', req.body);//
   try{
      const {error} = loginValidate(req.body);
      console.log(error);
      if(error){
         return res.status(400).send(`Invalid entry:${error}`);
      }
      const {username} =req.body;//username is login identification chose (username, phonenumber or e-mail)
      const isEmailRe=/.*@.*/;
      let user;
      if(isEmailRe.test(username)){
         user=await User.findOne({email:username})
      }else{
         user = await User.findOne({username:username});
         if(!user)
            user = await User.findOne({phoneNumber:username})
      }
      if(!user){ 
         return res.status(404).send("ID not found"); 
      }
      console.log('compare')//
      const validPass = await bcrypt.compare(req.body.password, user.password);
      console.log('compare done', validPass)//
      if(!validPass) {
         return res.status(400).send('Invalid password'); 
      }
      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET) //creates token using the secret and appends id as payload
      res.set('auth-token', token).json({success:true,message:''});
   }
   catch(e){
      console.log(e);
      return res.status(400).send('Invalid Input');
   }
   console.log('loging done');
});    



 module.exports = router;
