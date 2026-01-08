//External Modules
const express = require("express");
const multer = require("multer");
const upload = require("../middlewares/upload");

const generateData = express.Router();

// local modules 
const generatControllers = require("../controllers/generatControllers");



// Wrapper to handle multer errors
const uploadFiles = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'reference', maxCount: 1 }
]);

const handleUpload = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large. Maximum size is 10MB.' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// Handle multiple files: thumbnail and reference
generateData.post("/", handleUpload, generatControllers.createThubnailData);

// Get all thumbnails metadata
generateData.get("/getAll/metadata", generatControllers.getAllMetadata);

// Get thumbnail by image name
generateData.get("/thumbnail/:imageName", generatControllers.getThumbnailByImage);

// Get thumbnail by ID (keeping existing route)
generateData.get("/img/:id", generatControllers.getImg);

module.exports = generateData;