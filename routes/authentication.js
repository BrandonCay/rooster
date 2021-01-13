const router = require("express").Router();
const Joi =require('@hapi/joi');
const bcrypt=require('bcryptjs');
const {registerValidate, loginValidate} = require('../validation');
const User = require("../models/userModel");
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const aCodes=require("../models/activationCodes");
const client=require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const crypto = require("crypto");

const transporter=nodemailer.createTransport({
   service:"Gmail",
   auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
   }
})

const phoneOn=false;

async function dataExists(data){
   const fnd = await User.findOne(data);
   console.log(fnd);
   if(fnd)
      return true;
   return false;
}

async function sendCode(_id){   // code updates untested but disabled because limited attempts
   await aCodes.findOneAndDelete({userId:_id});
   const result = new aCodes({userId:_id, code:makeCode().toString()});
   result.save();
   client.messages.create(
      {
         body:"code here",
         from:`${process.env.TWILIO_PHONE}`,
         to:process.env.TEST_PHONE
      }
   )
}
function sendMail(userId, email){
   const token=jwt.sign({_id:userId},process.env.EMAIL_SECRET,{expiresIn:'1d'});
   transporter.sendMail({
      from: "No Reply", // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Click Link </b><a href=http://localhost:3000/verifyLink/${token}>http://localhost:3000/${token}</a>`, // html body
   });
}



async function makeCode(){ //used for making hashes for phone verification codes
   let result=crypto.randomInt(100000, 999999).toString();
   return result.toString();

}

function StatusObj(success=true,status=200, msg=""){
   this.success=success;
   this.status=status;
   this.msg=msg;
}

function NoEmail(){
   
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
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      registerInfo.password=hashPassword;
      registerInfo.dateCreated=new Date();
      let newUser = new User(registerInfo);
      newUser=await newUser.save();
      //check if e-mail exists or user existss
      let confirmationMsg;
      if(registerInfo.email){
         sendMail(newUser._id, registerInfo.email);
         confirmationMsg="A confirmation link was to your e-mail. Click on the link to activate your account";
      }else{
         if(phoneOn){
            sendCode(newUser._id);            //code works but limited attempts because of twilio account
            confirmationMsg=" A confirmation code was sent to your phone. Enter it at the link provided to activate your account";
         }else{
            newUser.active=true;
            confirmationMsg="The phone verification feature isn't activated yet so you're account is activated automatically. To see the verification"
            + " e-mail feature, enter your email";
            
         }
      }
      console.log('registered', registerInfo);
      res.json(new StatusObj(true, 200, `Account Successfully Registered. ${confirmationMsg}`)._id=newUser._id); //send login page for redirection 
   }
   catch(e){
      console.log(e);
      if(e instanceof StatusObj)
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
      if(!user.active){
         let location=""
         if(user.email){
            sendMail(user._id, user.email);
            location="e-mail"
         }else{
            if(phoneOn){
               sendCode(user._id); //phoneVerification not enabled
            }
            location="phone";
         }
         let vStatus=new StatusObj(false, 400, `Account not activated. A confirmation message was sent to your ${location}`);
         vStatus.payload=user._id;
         throw vStatus;//verification status
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass) {
         throw new StatusObj(false, 400, 'Invalid password');
      }
      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET) //creates token using the secret and appends id as payload
      res.set('auth-token', token).json(new StatusObj(true, 200, "Login Successful"));
   }
   catch(e){
      if(e instanceof StatusObj)
         res.status(e.status).json(e);
      else{
         res.status(400).json(new StatusObj(false,400,e.toString()));      
   }
}
   console.log('logging done');

});    


router.get("/:verifyCode", async (req,res)=>{
   try{
      const payload=jwt.verify(req.params.verifyCode, process.env.EMAIL_SECRET)
      console.log("payload: ", payload);
      if(await User.findByIdAndUpdate(payload._id, {active:true})){
         res.status(200).json({success:true, msg:"Verfication succeeded. Your account has been activated. You may login"});
      }else{
         throw new StatusObj(false, 404, "Verification failed. The code entered may not exist or may have expired")
      }//await necessary to work
   }catch(e){
      if(e instanceof StatusObj)
         res.status(e.status).json(e);
      else{
         res.status(400).json({success:false, msg:"An unexpected error occurred"});
      }
   }
});

router.post('/phoneVerify', async (req,res)=>{
   try{
      const { _id, code} = req.body //_id is past by client. Register/Login (contains _id) -> Verify Code page -> (Back end) -> phoneVerify
      let user = await aCodes.find({userId:_id});//problem:send id
      if(user.active){
         res.json(new StatusObj(true,200,"Your account is already active"));
      }
      console.log("Code types code,user.code",typeof code, typeof user.code);
      if(user.code === code){
         res.json(new StatusObj(true,200,"Your account has been activated"));
      } 
      else{
         throw new StatusObj(false, 404, "Not a valid code");
      }
   }catch(e){
      if(e instanceof StatusObj){
         res.status(e.status).json(e);
      }else{
         res.status(400).json(new StatusObj(false, 400, "An unexpected error occurred"));
      }
   }
}
)

 module.exports = router;
