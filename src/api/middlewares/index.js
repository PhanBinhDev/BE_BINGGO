const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyAccessToken: asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid Token",
          });
        }
        req.user = decode;
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Require Authenticate",
      });
    }
  }),
  errHandler: (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  },
  notFound: (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not match`);
    res.status(404);
    next();
  },
};
