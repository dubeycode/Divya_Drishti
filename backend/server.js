// external modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv =require("dotenv");



dotenv.config();




// local modules
const errorController = require("./controllers/error")
const genrateData = require("./routes/generateData")

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
