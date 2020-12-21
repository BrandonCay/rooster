const router = require('express').Router();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

router.get('/home', async(req,res)=>{ 
    try{
        let following = await userModel.findOne({_id:req.userId});
        following = following.following;
        const sz=following.length;
        let clucks = []
        const todayDate=new Date().getDate(); //todays date in days
        for(let i=0; i<sz;++i){
            let fClucks=following[i].clucks;
            for(let j=fClucks.length-1; j>=0 && fClucks[j].date.getDate()===todayDate; --j){//push all clucks from today. NOTE: twitter  
                clucks.push(fClucks[j]);
            }
        }  
        clucks.sort(function(a,b){return b.likes-a.likes});
    }catch(e){
        console.log(e);
    }
    //use date as primary sort and popular as secondary
    res.json({list:clucks});
})






/*
let interval = 86400000;
console.log(new Date().getDate() - 1);
console.log(new Date().getDate());
console.log(new Date().getUTCDate());
*/