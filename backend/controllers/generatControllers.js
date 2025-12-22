const thumbnailData = require("../models/thumbnaildata")


exports.createThubnailData = async (req,res,next)=>{

    try{
      console.log("Body:",req.body);
      
      const { Category, Title, Description, Ratio } = req.body;

        if (!Category || !Title) {
      return res.status(400).json({ message: "Missing fields" });
    }

  // const{ Catagory,Title,Description,Ratio }=req.body;
  const ThumbnailData = new thumbnailData({
    catagory: Catagory,
    title: Title,
    description:Description ,
    ratio:Ratio,
  })
  await ThumbnailData.save();
    res.status(201).json(ThumbnailData)
  } catch (error){
    console.error(error);
      res.status(500).json({ message: "Server error" });
  }
}


