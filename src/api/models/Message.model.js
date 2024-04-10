const { Types } = require("mongoose");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      type: Types.String,
      enum: ["Like", "Love", "Haha", "Sad", "Angry", "Wow", "Cry", "Excited"],
    },
    readBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    editedAt: {
      type: Date,
    },
    metadata: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
