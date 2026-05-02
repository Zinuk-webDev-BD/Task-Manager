const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: "",
  });
};

module.exports = cloudinaryConfig;