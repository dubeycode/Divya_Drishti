const mongoose =require("mongoose");

const  thumbnailDataSchema = mongoose.Schema({
   catagory:{
    type:String,
    required:true,
   },
   title:{
    type:String,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   ratio:{
    type:String,
    required:true,
   }
})

module.exports = mongoose.model("thumbnailData",thumbnailDataSchema)