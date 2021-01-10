const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRouter=require("./routes/authentication")
const token=require("./routes/verifyTokens");
const bodyParser = require('body-parser');
const path = require("path");
const Api = require("twilio/lib/rest/Api");
const User =require("./models/userModel");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology:true});



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.set("useCreateIndex", true);
//mongoose.set("useFinAndModify",false);
//mongoose.set("createIndexes",true);
//app.use(express.json());
app.use('/api/auth',authRouter);
const unxErr={success:false, status:400, msg:"Unexpected error"};
app.get('/api/userexists/:_id',async (req,res)=>{
    try{
    const result= (await User.findOne({_id:req.params._id}))? true:false;
    res.json({exists:result});
    }catch(e){
        res.status(400).json(unxErr);
    }
})
app.get('/api/userdata', token, async (req,res) => {
    try{
    const data = await User.findById(req.userId);
    res.json(data);
    }
    catch(e){
        res.status(400).json(unxErr);
    }
})
//app.use('/api/user',) //get and post requests by users
       

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`listening to port ${PORT}`)});