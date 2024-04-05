const { Types } = require("mongoose");
const mongoose = require("mongoose");
const MemberModel = require("./MemberModel.model");

const conversationSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      require: true,
    },
    members: [MemberModel],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    messages: {},
    avatar: {
      type: String,
    },
    isCommunity: {
      type: Boolean,
      default: false,
    },
    roleConversation: {
      type: Types.ObjectId,
      ref: "RoleConversation",
    },
    attachments: [
      {
        type: String,
        fileType: {
          type: String,
          enum: ["image", "audio", "link", "document"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", conversationSchema);
