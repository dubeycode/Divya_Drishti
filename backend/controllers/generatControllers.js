const thumbnailData = require("../models/thumbnaildata")


exports.createThubnailData = async (req,res,next)=>{

    try{
      console.log("Body:",req.body);
      
      const { Category, title, description, ratio } = req.body;

        if (!Category || !title || !description || !ratio) {
      return res.status(400).json({ message: "Missing fields" });
    }

  const ThumbnailData = new thumbnailData({
    catagory: Category,
    title: title,
    description: description,
    ratio: ratio,
  })
  await ThumbnailData.save();
    res.status(201).json(ThumbnailData)
  } catch (error){
    console.error(error);
      res.status(500).json({ message: "Server error" });
  }
}


