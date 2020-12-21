const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        username:{
            type: String,
            required: true,
        },
        password:String,
        name:String,
        DoB:Date, 
        email:String,
        phoneNumber:String,
        followers:Array,
        following:Array,
        messages:Array,
        clucks:Array,  //Rooster equivalent to twitter tweets 
        media: Array,
        likes: Array,
        verified:Boolean,
        clucksAndReplies: Array,
        dateCreated: Date
    }
)
const Model=mongoose.model;
const userModel=new Model('users',userSchema);

module.exports = userModel;