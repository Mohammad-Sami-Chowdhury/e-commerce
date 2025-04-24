const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadResult = async (fileName) => {
  try {
    const result = await cloudinary.uploader.upload(fileName, {
      folder: "products",
    });
    fs.unlinkSync(fileName);
    return result;
  } catch (error) {
    fs.unlinkSync(fileName);
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

module.exports = uploadResult;
