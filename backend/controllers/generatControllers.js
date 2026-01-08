const thumbnailData = require("../models/thumbnaildata")
const path = require("path");

exports.createThubnailData = async (req, res, next) => {
  try {
    // console.log("Body:", req.body);
    // console.log("Files:", req.files);

    const { Category, title, description, ratio } = req.body;

    if (!Category || !title || !description || !ratio) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get file paths if they exist
    let thumbnailPath = "";
    let referencePath = "";

    if (req.files) {
      if (req.files['thumbnail'] && req.files['thumbnail'][0]) {
        // Store the URL path for accessing the image via static route
        const filename = path.basename(req.files['thumbnail'][0].path);
        thumbnailPath = `/uploads/${filename}`;
      }
      if (req.files['reference'] && req.files['reference'][0]) {
        // Store the URL path for accessing the image via static route
        const filename = path.basename(req.files['reference'][0].path);
        referencePath = `/uploads/${filename}`;
      }
    }

    // Validate that at least one image is provided
    if (!thumbnailPath && !referencePath) {
      return res.status(400).json({ 
        success: false,
        message: "At least one image (thumbnail or reference) is required" 
      });
    }

    const ThumbnailData = new thumbnailData({
      catagory: Category,
      title: title,
      description: description,
      ratio: ratio,
      ImageStyle: thumbnailPath || "",
      referenceImage: referencePath || "",
    });

    await ThumbnailData.save();
    return res.status(201).json({ 
      success: true,
      data: ThumbnailData 
    });
  } catch (error) {
    console.error("Error in createThubnailData:", error);
    return res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
}

exports.getImg = async (req,res,next)=>{
  const {id} = req.params;
  try {
    const image = await thumbnailData.findById(id);
    if(!image) {
      return res.status(404).json({"msg":"Image Not Found"});
    }
    return res.status(200).json(image);
  } catch (error) {
    console.error("Error in getImg:", error);
    return res.status(500).json({"error": "Unable to get image", message: error.message});
  }
}

// Get all thumbnails metadata
exports.getAllMetadata = async (req, res, next) => {
  try {
    const allThumbnails = await thumbnailData.find();
    return res.status(200).json({
      success: true,
      count: allThumbnails.length,
      data: allThumbnails
    });
  } catch (error) {
    console.error("Error in getAllMetadata:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to get thumbnails",
      message: error.message
    });
  }
}

// Get thumbnail by image name
exports.getThumbnailByImage = async (req, res, next) => {
  const { imageName } = req.params;
  try {
    // Search by ImageStyle field which contains the filename
    const thumbnail = await thumbnailData.findOne({
      ImageStyle: { $regex: imageName, $options: 'i' }
    });
    
    if (!thumbnail) {
      return res.status(404).json({
        success: false,
        msg: "Thumbnail Not Found"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: thumbnail
    });
  } catch (error) {
    console.error("Error in getThumbnailByImage:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to get thumbnail",
      message: error.message
    });
  }
}





