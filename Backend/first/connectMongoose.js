const mongoose = require("mongoose");

async function connectMongoose(URL){
    mongoose.connect(URL)
    .then( ()=>{ console.log("Mongoose connected"); })
    .catch( (e)=>{ console.log("Mongoose error:", e); })
}

module.exports = connectMongoose;