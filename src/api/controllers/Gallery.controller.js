const asyncHandler = require("express-async-handler");
const {
  handleGetGalleryService,
  handleUploadGalleryService,
  handleDeleteGalleryService,
} = require("../services/Gallery.services");
const getGalleryController = asyncHandler(async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({
      errCode: 1,
      message: "Category not provided",
    });
  }

  const response = await handleGetGalleryService(category);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
    gallery: response.gallery,
  });
});

const uploadGalleryController = asyncHandler(async (req, res) => {
  const file = req.file;
  const category = "other";
  const subCategory = "";
  if (!file) {
    return res.status(500).json({
      errCode: 1,
      message: "Something went wrong with server. Please try later",
    });
  }
  const response = await handleUploadGalleryService(
    file,
    category
    // subCategory
  );
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
});

const deleteGalleryController = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    throw new Error("Missing id gallery to delete.");
  }

  const response = await handleDeleteGalleryService(_id);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
});
module.exports = {
  getGalleryController,
  uploadGalleryController,
  deleteGalleryController,
};
