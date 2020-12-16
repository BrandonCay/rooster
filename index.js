const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRouter=require("./routes/authentication")

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology:true});



app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/user',) //get and post requests by users


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`listening to port ${PORT}`)});