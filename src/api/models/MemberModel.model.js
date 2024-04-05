const { Types } = require("mongoose");
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    require: true,
    ref: "User",
  },
  addBy: {
    type: Types.ObjectId,
    ref: "User",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Members", memberSchema);
