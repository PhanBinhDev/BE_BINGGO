const router = require("express").Router();
const controls = require("../controllers/Conversation.controller");
const uploadCloud = require("../middlewares/uploader");
const { verifyAccessToken } = require("../middlewares");
router.post("/", verifyAccessToken, controls.createConversation);

module.exports = router;
