const fs = require("fs");
const path = require("path");

async function saveImage(base64) {
  const buffer = Buffer.from(base64, "base64");
  const fileName = `thumb_${Date.now()}.png`;
  const filePath = path.join(__dirname, "../uploads", fileName);

  fs.writeFileSync(filePath, buffer);

  return `https://divya-drishti-lemon.vercel.app/:5000/uploads/${fileName}`;
}

module.exports = saveImage;
