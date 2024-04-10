const asyncHandler = require("express-async-handler");
const {
  handleCreateNewConversationService,
} = require("../services/Conversation.services");

const createConversation = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const file = req.file;
  if (!file) {
    return res.status(500).json({
      errCode: 1,
      message: "Something went wrong with server. Please try later",
    });
  }
  const { isGroupChat, nameChat, members } = req.body;
  if (!email) throw new Error("Invalid Credentials");

  const data = {
    email,
    file,
    nameChat,
    members,
    isGroupChat,
  };

  const response = await handleCreateNewConversationService(data);

  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
});

module.exports = {
  createConversation,
};
