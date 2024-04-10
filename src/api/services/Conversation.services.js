const Conversation = require("../models/Conversation.model");

const handleCreateNewConversationService = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
  });
};

module.exports = {
  handleCreateNewConversationService,
};
