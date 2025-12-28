//External Modules
const express = require("express");
const upload = require("../middlewares/upload");

const generateData = express.Router();

// local modules 
const generatControllers = require("../controllers/generatControllers");



// Handle multiple files: thumbnail and reference
generateData.post("/", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'reference', maxCount: 1 }
]), generatControllers.createThubnailData);

module.exports = generateData;