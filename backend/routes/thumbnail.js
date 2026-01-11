const express = require("express");
const multer = require("multer");
const buildThumbnailPrompt = require("../utils/promptBuilder");
const generateImage = require("../services/geminiImage");
const saveImage = require("../utils/saveImage");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/generate-thumbnail",
  upload.single("image"),
  async (req, res) => {
    try {
      // Accept both "category" and "Category" for flexibility
      const category = req.body.category || req.body.Category;
      const { title, description, ratio } = req.body;

      if (!category || !title || !description || !ratio) {
        return res.status(400).json({ 
          success: false,
          message: "Missing required fields: category, title, description, ratio" 
        });
      }

      // 1️⃣ Prompt
      const prompt = buildThumbnailPrompt({
        category,
        title,
        description,
        ratio
      });

      // 2️⃣ Reference image
      const base64Image = req.file
        ? req.file.buffer.toString("base64")
        : null;

      // 3️⃣ Generate image using AI service
      console.log("Starting image generation...");
      const imageBase64 = await generateImage(prompt, base64Image);

      if (!imageBase64) {
        throw new Error("Image generation returned empty result");
      }

      // 4️⃣ Save image
      const imageUrl = await saveImage(imageBase64);

      res.json({
        success: true,
        imageUrl
      });
    } catch (err) {
      console.error("Image generation error:", err);
      res.status(500).json({ 
        success: false,
        message: err.message || "Image generation failed",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
      });
    }
  }
);

module.exports = router;
