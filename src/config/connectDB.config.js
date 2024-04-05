const { default: mongoose } = require("mongoose");
const { mongodb } = require("./Database.config");

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(mongodb.host);
    if (connect.connection.readyState === 1) {
      console.log("DB connect successfully");
    }
  } catch (error) {
    console.log("Connect Failed", error);
    throw new Error(error);
  }
};

module.exports = connectToDB;
