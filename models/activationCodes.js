const mongoose = require("mongoose");

const activeS = new mongoose.Schema({
    userId: String,
    code: String ,
    expire_at:{type:Date, default:Date.now, expires: 7200}
})

module.exports = new mongoose.model("activationCodes",activeS);