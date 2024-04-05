const { Types } = require("mongoose");
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    isAdmin: [
      {
        type: Types.ObjectId,
        require: true,
        ref: "User",
      },
    ],
    member: [
      {
        type: Types.ObjectId,
        require: true,
        ref: "User",
      },
    ],
    allowChat: {
      type: Boolean,
      default: true,
    },
    allowViewOtherMembers: {
      type: Boolean,
      default: true,
    },
    allowAddNewMember: {
      type: Boolean,
      default: true,
    },
    allowAdjustInfoGroup: {
      type: Boolean,
      default: true,
    },
    isBlocked: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoleConversation", roleSchema);
