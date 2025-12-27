// external modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

// local modules
const errorController = require("./controllers/error")
const genrateData = require("./routes/generateData")

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use("/generate", genrateData);

// 404
app.use(errorController.pageNoteFound);


const port = 5000;

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
