const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");
const {
  handleAuthenticateService,
  handleVerifyCodeService,
  handleGetCurrentUserService,
} = require("../services/User.services");
const { generateToken } = require("../helpers");
const jwt = require("jsonwebtoken");

const authenticateController = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({
      errCode: 1,
      message: "Email not provided",
    });
  }

  const response = await handleAuthenticateService(email);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
});

const verifyEmailCodeController = asyncHandler(async (req, res) => {
  const { code, email } = req.query;
  const { device } = req.body;
  if (!device) {
    return res.status(400).json({
      errCode: 1,
      message: "Cannot inspect device",
    });
  }
  if (!code) {
    return res.status(400).json({
      errCode: 1,
      message: "OTP Code not provided",
    });
  }
  if (!email) {
    return res.status(400).json({
      errCode: 1,
      message: "Email not provided",
    });
  }

  const response = await handleVerifyCodeService(email, code, device);
  if (response.errCode === 0) {
    res.cookie("refreshToken", response.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
    userData: response.userData,
    accessToken: response.accessToken,
  });
});

const getCurrentUserController = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const response = await handleGetCurrentUserService(email);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
    data: response.data,
  });
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      errCode: 1,
      errMessage: "Require authenticate",
    });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        errCode: 2,
        errMessage: "RefreshToken has expired",
      });
    }
    const response = await User.findOne({
      "email.value": decode.email,
      refreshToken,
    });
    return res.status(200).json({
      errCode: response ? 0 : 1,
      newAccessToken: response ? generateToken(response.email.value) : "",
      message: response ? "OK" : "RefreshToken not matched",
    });
  });
});

const logoutController = asyncHandler(async (req, res) => {
  // req.cook
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new Error("No refresh token in cookies");
  }

  // Delete refreshToken in DB

  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    errCode: 0,
    message: "Logout!",
  });
});

const nameController = asyncHandler(async (req, res) => {
  const response = await handleNameService();
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
});

const testCookiesController = asyncHandler(async (req, res) => {
  // const response = await handleNameService();
  return res.status(200).json("OK");
});
module.exports = {
  authenticateController,
  verifyEmailCodeController,
  getCurrentUserController,
  refreshTokenController,
  logoutController,
  testCookiesController,
};
