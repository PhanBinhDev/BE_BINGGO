const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares");
const controls = require("../controllers/AccountHistory.controller");

router.get("/", verifyAccessToken, controls.getHistoryLogController);

module.exports = router;
