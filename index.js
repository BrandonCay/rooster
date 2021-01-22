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
const userRoute = require('./routes/user');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology:true});



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.set("useCreateIndex", true);
//mongoose.set("useFinAndModify",false);
//mongoose.set("createIndexes",true);
//app.use(express.json());
const unxErr={success:false, status:400, msg:"Unexpected error"};
app.use('/api/auth',authRouter);
app.use('/api/user',userRoute);
//app.use('/api/user',) //get and post requests by users
       

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`listening to port ${PORT}`)});