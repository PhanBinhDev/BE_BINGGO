const { Types } = require("mongoose");
const mongoose = require("mongoose");
const { MemberModel } = require("./MemberModel.model").schema;

const accountHistorySchema = new mongoose.Schema(
  {
    accountId: {
      type: Types.ObjectId,
      ref: "User",
    },
    device: {
      deviceName: {
        type: String,
      },
      deviceType: {
        type: String,
      },
      operatingSystem: {
        type: String,
        enum: ["Windows", "Mac", "Linux"],
      },
      status: {
        type: String,
        enum: ["ON", "OFF"],
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    action: {
      type: String,
      enum: [
        "REGISTER",
        "LOGOUT",
        "LOGIN",
        "UPDATE_INFO",
        "ADD_DEVICE",
        "REMOVE_DEVICE",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccountHistory", accountHistorySchema);
