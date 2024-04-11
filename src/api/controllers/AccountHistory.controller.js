const asyncHandler = require("express-async-handler");
const {
  handleGetLogHistoryService,
} = require("../services/AccountHistory.services");
const getHistoryLogController = asyncHandler(async (req, res) => {
  const { accountId } = req.query;
  if (!accountId) {
    return res.status(400).json({
      errCode: 1,
      message: "accountId not provided",
    });
  }

  const response = await handleGetLogHistoryService(accountId);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
    data: response.data,
  });
});

module.exports = {
  getHistoryLogController,
};
