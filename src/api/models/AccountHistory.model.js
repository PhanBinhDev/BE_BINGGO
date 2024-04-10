const { Types } = require("mongoose");
const mongoose = require("mongoose");
const { MemberModel } = require("./MemberModel.model").schema;

const accountHistorySchema = new mongoose.Schema(
  {
    accountId: {
      type: Types.ObjectId,
      ref: "User",
    },
    device: { type: Types.ObjectId, ref: "Device" },
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
