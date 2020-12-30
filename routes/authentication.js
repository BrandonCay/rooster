const router = require("express").Router();
const Joi =require('@hapi/joi');
const bcrypt=require('bcryptjs');
const {registerValidate, loginValidate} = require('../validation');
const User = require("../models/userModel");
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const client=require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const phoneOn=false;
async function dataExists(data){
   const fnd = await User.findOne(data);
   console.log(fnd);
   if(fnd)
      return true;
   return false;
}
const transporter=nodemailer.createTransport({
   service:"Gmail",
   auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
   }
})

function catchResponse(e,res){
   if('msg' in e)
   res.status(e.status).json(e);
   else{
   res.status(400).json(new StatusObj(false,400,e));      
//return res.status(400).send('Invalid In
   }
}

function StatusObj(success,status, msg){
   this.success=success;
   this.status=status;
   this.msg=msg;
}





router.post('/register', async (req,res)=>{
   let registerInfo = req.body;
   try{
      const {error} = registerValidate(registerInfo);
      if(error){
         console.log(error);
         throw new StatusObj(false, 400, 'Invalid Entry');
         // return res.status(400).send('Invalid Entry');
      }
      const {username, email, phoneNumber} = registerInfo;
      if(!username || (!email && !phoneNumber)){
         throw new StatusObj(false, 400,'Please enter a username then enter either an email or phone number or both');
        //return res.status(400).send('Please enter a username then enter either an email or phone number or both');
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
         throw new StatusObj(false,400,"Some of the provided info is already in use. Cannot make another account" )
        // return res.status(400).send("Some of the provided info is already in use. Cannot make another account");
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      registerInfo.password=hashPassword;
      registerInfo.dateCreated=new Date();
      let newUser = new User(registerInfo);
      newUser=await newUser.save();
      //check if e-mail exists or user existss
      let confirmationMsg;
      if(registerInfo.email){
         
         const token=jwt.sign({_id:newUser._id},process.env.EMAIL_SECRET,{expiresIn:'1d'});
         transporter.sendMail({
            from: "No Reply", // sender address
            to: `${registerInfo.email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Click Link</b><a href=http://localhost:3000/${token}>http://localhost:3000/${token}</a>`, // html body
         });
         confirmationMsg="A confirmation link was to your e-mail. Click on the link to activate your account";
      }else{
         if(phoneOn){
            //code works but limited attempts
            const token=jwt
            client.messages.create(
               {
                  body:"code here",
                  from:`${process.env.TWILIO_PHONE}`,
                  to:'19734324252'
               }
            )
         }else{
         
         }
         confirmationMsg="A confirmaiton code was sent to your phone. Enter it at the link provided to activate your account";
      }
      console.log('registered', registerInfo);
      res.json(new StatusObj(true, 200, `Account Successfully Registered. ${confirmationMsg}`)); //send login page for redirection 
   }
   catch(e){
      console.log(e);
      if('msg' in e)
      res.status(e.status).json(e);
      else{
      res.status(400).json(new StatusObj(false,400,e));      
      }
      //catchResponse(e,res);
   }
});

//need to test jsontoken to see if it remains in the req.userId even after new requests. If so, then we don't need to store it into client
router.post('/login', async (req,res) => {
   console.log('logging', req.body);//
   try{
      const {error} = loginValidate(req.body);
      console.log(error);
      if(error){
         throw new StatusObj(false, 400,`Invalid entry: ${error}`)
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
         throw new StatusObj(false, 404, "ID not found");
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass) {
         throw new StatusObj(false, 400, 'Invalid password');
      }
      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET) //creates token using the secret and appends id as payload
      res.set('auth-token', token).json(new StatusObj(true, 200, "Login Successful"));
   }
   catch(e){
      if('msg' in e)
         res.status(e.status).json(e);
      else{
         res.status(400).json(new StatusObj(false,400,e));      
   }
}
   console.log('loging done');

});    


router.get("/:verifyCode", async (req,res)=>{
   try{
      const payload=jwt.verify(req.params.verifyCode, process.env.EMAIL_SECRET)
      console.log("payload: ", payload);
      await User.findByIdAndUpdate(payload._id, {active:true}); //await necessary to work
      res.status(200).json({success:true, msg:"Verfication succeeded. Your account has been activated. You may login"});   
   }catch(e){
      res.status(404).json({success:false, msg:"Verification failed. The code entered may not exist or may have expired"});
   }
});

 module.exports = router;
