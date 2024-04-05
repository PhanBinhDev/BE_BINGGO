const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares");
const controls = require("../controllers/Gallery.controller");
const uploadCloud = require("../middlewares/uploader");

// router.get("",)
router.get("/", verifyAccessToken, controls.getGalleryController);
router.post(
  "/upload-gallery",
  uploadCloud.single("image"),
  controls.uploadGalleryController
);

module.exports = router;
