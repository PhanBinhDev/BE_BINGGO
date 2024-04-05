const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Lưu trữ file
var gallerySchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
    filename: {
      type: String,
    },
    category: {
      type: String,
      enum: ["profile", "banner", "logo", "group", "other"],
    },
    subCategory: {
      type: String,
      enum: ["family", "work", "friends", "school"],
      required: function () {
        return this.category === "group";
      },
    },
    userUpload: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
