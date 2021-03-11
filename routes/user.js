const router = require('express').Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const verifyTok=require("./verifyTokens");
const StatusObj = require("./statusObj");


const defaultData=
{
    author:"Author",
    text:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa AaaaaaA AAA AA AAAAA AA AAA",
    likes:0,
    to:[],
    reclucks:0,
}

const checkUserData = async (req,res,next) => {
    try{
        //TEST INPUT
        
  
        let data=defaultData;
        req.user={clucks:[data]}
        console.log("middleware suc",req.user)
        /*
        req.user = await userModel.findById(req.userId);
        console.log(req.user); */
    }catch(e){
        res.json({msg:"An Unexpected Error Occurred"});
    }
    next();
}

router.get('/home', checkUserData, async(req,res)=>{ 
    //test code without verifyToken to get data
    try{
        res.json({clucks:req.user.clucks})
    }catch(e){
        res.status(400).json({msg:"An Unexpected Error Occurred"});
    }
    /*
    try{
        let following = await userModel.findOne({_id:req.userId});
        following = following.following;
        const sz=following.length;
        let clucks = []
        const todayDate=new Date().getDate(); //todays date in days
        for(let i=0; i<sz;++i){
            let fClucks=following[i].clucks;
            for(let j=fClucks.length-1; j>=0 && fClucks[j].date.getDate()===todayDate; --j){//push all clucks from today.  
                clucks.push(fClucks[j]);
            }
        }  
        clucks.sort(function(a,b){return b.likes-a.likes});
    }catch(e){
        console.log(e);
    }
    //use date as primary sort and popular as secondary
    res.json({list:clucks});*/
})

router.get('/profile',(req,res)=>{
    res.json({msg:"hi"});
})
router.get('/userexists/:_id',async (req,res)=>{
    try{
    const result= (await User.findOne({_id:req.params._id}))? true:false;
    res.json({exists:result});
    }catch(e){
        res.status(400).json(unxErr);
    }
})
router.get('/userdata', verifyTok, async (req,res) => {
    try{
    const data = await User.findById(req.userId);
    res.json(data);
    }
    catch(e){
        res.status(400).json(unxErr);
    }
})

//logged in user provided by token
router.post('/reply', async (req,res)=>{
    const {receiverId, cluckId, replyCluck} = req.body;
    const receiver = await userModel.findById(receiverId);
    const cluckList= receiver.clucks, sz=cluckList.length;
    let i, newReplies;
    for(i=0; i<sz; ++i){
        if(cluckList[i].cluckId===cluckId){{//search for replyingTo cluck and add the reply to its replies list
            newReplies = [...cluckList.replies,replyCluck];
            break;
        }}
    }
    receiver.clucks[i].replies=newReplies;//replaces reply list
    await receiver.save();//saves new doc in server
    res.json(new StatusObj());
})


module.exports = router;

/*
let interval = 86400000;
console.log(new Date().getDate() - 1);
console.log(new Date().getDate());
console.log(new Date().getUTCDate());
*/