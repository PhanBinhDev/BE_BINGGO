const AccountHistory = require("../models/AccountHistory.model");
const handleGetLogHistoryService = (accountId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const logHistoryById = await AccountHistory.find({ accountId });
      if (logHistoryById) {
        resolve({
          errCode: 0,
          message: "Get History Successfully",
          data: logHistoryById,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Get History Failed",
          data: [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleGetLogHistoryService,
};
