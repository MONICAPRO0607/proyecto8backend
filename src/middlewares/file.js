const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "proyecto8backend",
    allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"]
  }
});

const upload = multer({ storage: storage });

module.exports = upload;