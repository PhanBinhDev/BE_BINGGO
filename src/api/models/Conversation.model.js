const { Types } = require("mongoose");
const mongoose = require("mongoose");
const { MemberModel } = require("./MemberModel.model").schema;

const conversationSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      require: true,
    },
    nameChat: {
      type: String,
      require: function () {
        return this.isGroupChat === true;
      },
    },
    members: { type: [MemberModel], default: [] },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],
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
