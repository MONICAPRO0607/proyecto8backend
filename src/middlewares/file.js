const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const author = req.body.authors || 'default'; 
    
    const folderName = `proyecto8backend/${author.toLowerCase().replace(/\s+/g, "-")}`;

    return {
    folder: folderName,
    allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    public_id: file.originalname.split(".")[0],
  };
}
});

const upload = multer({ storage: storage });

module.exports = upload;