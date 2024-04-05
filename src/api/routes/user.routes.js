const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares");
const controls = require("../controllers/User.controller");

// router.get("",)
router.post("/authenticate", controls.authenticateController);
router.post("/verify-code", controls.verifyEmailCodeController);
router.get("/", verifyAccessToken, controls.getCurrentUserController);
router.post("/auth/refresh-token", controls.refreshTokenController);
router.post("/logout", controls.logoutController);
router.post("/cookie", verifyAccessToken, controls.testCookiesController);
module.exports = router;
