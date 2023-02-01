const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then((data) => {
        console.log("DB Connected Successful");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectDB;
