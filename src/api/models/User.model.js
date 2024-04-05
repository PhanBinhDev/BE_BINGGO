const mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    email: {
      value: {
        type: String,
        require: true,
      },
      public: {
        type: Boolean,
        default: true,
      },
    },
    userName: {
      type: String,
    },
    isNewUser: {
      type: Boolean,
      default: true,
    },
    gender: {
      value: {
        type: String,
        default: "U",
      },
      public: {
        type: Boolean,
        default: true,
      },
    },
    avatar: [
      {
        value: {
          type: String,
        },
        isSet: {
          type: Boolean,
        },
      },
    ],
    bio: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
