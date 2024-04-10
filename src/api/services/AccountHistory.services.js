const {
  generateEmailCode,
  sendMail,
  generateToken,
  generateRefreshToken,
} = require("../helpers");
const Gallery = require("../models/Gallery.model");
const cloudinary = require("cloudinary").v2;
const handleGetGalleryService = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const galleryByCategory = await Gallery.find({ category });
      if (galleryByCategory) {
        resolve({
          errCode: 0,
          message: "Get Gallery Successfully",
          gallery: galleryByCategory,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Get Gallery Failed",
          gallery: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUploadGalleryService = async (file, category, subCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const uploaded = await Gallery.create({
        value: file.path,
        filename: file.filename,
        category,
        subCategory,
      });
      if (uploaded) {
        resolve({
          errCode: 0,
          message: "Uploaded Successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Uploaded failed",
        });
        cloudinary.uploader.destroy(file.filename);
      }
    } catch (error) {
      reject(error);
      cloudinary.uploader.destroy(file.filename);
    }
  });
};

const handleDeleteGalleryService = async (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resDelete = await Gallery.findByIdAndDelete(_id);
      if (resDelete) {
        cloudinary.uploader.destroy(resDelete.filename);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleGetGalleryService,
  handleUploadGalleryService,
  handleDeleteGalleryService,
};
