const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var emailCodeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    emailCode: {
      type: String,
      require: true,
    },
    emailCodeExpires: {
      type: Date,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

emailCodeSchema.pre("save", async function (next) {
  if (!this.isModified("emailCode")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.emailCode = await bcrypt.hash(this.emailCode, salt);
});

emailCodeSchema.methods = {
  isCorrectCode: async function (emailCode) {
    return await bcrypt.compare(emailCode, this.emailCode);
  },
};

module.exports = mongoose.model("EmailCode", emailCodeSchema);
