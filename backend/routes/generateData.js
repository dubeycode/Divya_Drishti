//External Modules
const express =require("express");
const generateData  = express.Router();

// local modules 
const generatControllers = require("../controllers/generatControllers");

generateData.post("/",generatControllers.createThubnailData)

module.exports=generateData