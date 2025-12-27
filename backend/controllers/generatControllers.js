const thumbnailData = require("../models/thumbnaildata")
const path = require("path");

exports.createThubnailData = async (req, res, next) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { Category, title, description, ratio } = req.body;

    if (!Category || !title || !description || !ratio) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get file paths if they exist
    let thumbnailPath = "";
    let referencePath = "";

    if (req.files) {
      if (req.files['thumbnail'] && req.files['thumbnail'][0]) {
        thumbnailPath = req.files['thumbnail'][0].path;
      }
      if (req.files['reference'] && req.files['reference'][0]) {
        referencePath = req.files['reference'][0].path;
      }
    }

    // Use thumbnail path as ImageStyle (or you can store both separately)
    const ImageStyle = thumbnailPath || "";

    const ThumbnailData = new thumbnailData({
      catagory: Category,
      title: title,
      description: description,
      ratio: ratio,
      ImageStyle: ImageStyle,
    });

    await ThumbnailData.save();
    res.status(201).json(ThumbnailData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}





