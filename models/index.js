const dbConfig= require("../config/db.config.js");
const mongoose=require("mongoose")
mongoose.promise=global.promise;
const db={};
db.mongoose=mongoose;
db.url= dbConfig.url;
db.task=require("./todo.models.js")(mongoose);
module.exports=db;