const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// Cấu hình transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: "phanbinh04092004@gmail.com",
  auth: {
    user: "phanbinh04092004@gmail.com",
    pass: "yjfrqhyldweowzml",
  },
});

module.exports = {
  convert: () => {},
  formatTime: () => {},
  sendMail: async (to, subject, html) => {
    try {
      const mailOptions = {
        from: "phanbinh04092004@gmail.com",
        to,
        subject,
        html,
      };

      const statusSend = await transporter.sendMail(mailOptions);
      console.log("statusSend", statusSend);
      return statusSend;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  generateEmailCode: (time) => {
    const emailCode = Math.floor(Math.random() * 900000) + 100000;
    const expires = Date.now() + time * 60 * 1000;
    return {
      emailCode,
      expires,
    };
  },
  generateToken: (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },
  generateRefreshToken: (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  },
};
