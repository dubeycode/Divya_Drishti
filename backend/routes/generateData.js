//External Modules
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const generateData = express.Router();

// local modules 
const generatControllers = require("../controllers/generatControllers");


// multer configuration for this route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Handle multiple files: thumbnail and reference
generateData.post("/", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'reference', maxCount: 1 }
]), generatControllers.createThubnailData);

module.exports = generateData;