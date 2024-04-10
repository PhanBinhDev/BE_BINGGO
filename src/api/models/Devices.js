const { Types } = require("mongoose");
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceName: {
      type: String,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["ON", "OFF"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
