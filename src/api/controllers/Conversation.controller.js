const asyncHandler = require("express-async-handler");

const createConversation = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { isGroupChat } = req.body;
  if (!email) throw new Error("Invalid Credentials");
});

module.exports = {
  createConversation,
};
