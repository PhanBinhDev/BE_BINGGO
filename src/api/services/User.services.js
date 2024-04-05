const { NEW_USER, OLD_USER } = require("../constants");
const {
  generateEmailCode,
  sendMail,
  generateToken,
  generateRefreshToken,
} = require("../helpers");
const EmailCode = require("../models/EmailCode.model");
const User = require("../models/User.model");

const handleAuthenticateService = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existCode = await EmailCode.findOne({ email });
      if (existCode) {
        await EmailCode.deleteOne({ email });
      }
      const { emailCode, expires } = generateEmailCode(15);
      console.log({
        emailCode,
        expires,
      });
      const html = `
          <!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verify</title>
                  <link href="https://unpkg.com/tailwindcss@0.7.4/dist/tailwind.min.css" rel="stylesheet" />
                  <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" />
                  <style>
                      .email{
                          display: flex,
                          justify-content: center,
                          align-items: center,
                          min-height: 100vh,
                          padding: 20px,
                          background: "
                      }
                  </style>
              </head>
              <body>
                  <div class="email flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
                      <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                          <h3 class="text-2xl">Thanks for signing up for Binggo App!</h3>
                          <div class="flex justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                              </svg>
                          </div>

                          <p>We're happy you're here. Let's get your email address verified:</p>
                          <div class="mt-4">
                              <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded">${emailCode}</button>
                              
                          </div>
                      </div>
                  </div>
              </body>
          </html>`;

      // send email
      const res = await sendMail(
        email,
        "Verify Your Email To Join Binggo",
        html
      );

      if (res && res.accepted && res.accepted.length > 0) {
        const newEmailCode = await EmailCode.create({
          email,
          emailCode,
          emailCodeExpires: expires,
        });
        if (!newEmailCode) {
          resolve({
            errCode: 2,
            message: "Something went wrong with server. Please try again!",
            type: NEW_USER,
          });
        }
        resolve({
          errCode: 0,
          message: "Verify code has been sent to you. Please check your email",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Send mail verification failed. Please try again!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleVerifyCodeService = async (email, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existEmail = await EmailCode.findOne({ email });
      const existUser = await User.findOne({ "email.value": email }).select(
        "-refreshToken"
      );
      if (existEmail) {
        // đã send mail thành công
        const isExpired = existEmail.emailCodeExpires < new Date();
        if (!isExpired) {
          // vẫn còn hạn
          if (!existEmail.isUsed) {
            // one-time-code
            // chưa được sử dụng
            const verified = await existEmail.isCorrectCode(code);
            // xác thực code từ FE
            if (verified) {
              const accessToken = generateToken(email);
              const refreshToken = generateRefreshToken(email);
              if (existUser) {
                // trả về thông tin user cho FE
                existUser.refreshToken = refreshToken;
                await existUser.save();
                existEmail.isUsed = true;
                await existEmail.save();
                resolve({
                  errCode: 0,
                  message: `Verified successfully.${
                    existUser.isNewUser
                      ? "Come to setup page"
                      : "Come to home page"
                  }`,
                  accessToken,
                  refreshToken,
                  userData: existUser,
                });
              } else {
                // create new user
                const newUser = await User.create({
                  email: {
                    value: email,
                  },
                  refreshToken,
                });
                if (newUser) {
                  // trả về response thông báo welcome first come to Binggo and setup some information for account
                  existEmail.isUsed = true;
                  await existEmail.save();
                  resolve({
                    errCode: 0,
                    message: "Verified successfully Come to setup page",
                    userData: newUser,
                    accessToken,
                    refreshToken,
                  });
                }
                resolve({
                  errCode: 4,
                  message: "Create user failed. Please try again",
                  accessToken: "",
                  refreshToken: "",
                });
              }
            } else {
              resolve({
                errCode: 1,
                message: "Verified failed. OTP code not match!",
              });
            }
          } else {
            resolve({
              errCode: 5,
              message: "OTP Code has been used!",
            });
          }
        } else {
          resolve({
            errCode: 2,
            message: "Email Code has been expired",
          });
        }
      } else {
        resolve({
          errCode: 3,
          message:
            "Cannot find email. Something wrong with your email. Please sure that email match with email verify",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetCurrentUserService = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        throw new Error("Missing email to get user");
      }

      const user = await User.findOne({ "email.value": email }).select(
        "-refreshToken"
      );
      if (user) {
        resolve({
          errCode: 0,
          message: "Get current user success",
          data: user,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Get current user failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleService = async (args) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleAuthenticateService,
  handleVerifyCodeService,
  handleGetCurrentUserService,
};
