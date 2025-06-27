const mongoose = require("mongoose");
const DB_Conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`DB Successfully Connected.`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = DB_Conn;
