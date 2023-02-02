const mongoose = require("mongoose");

// const DB_URI =
//   "mongodb+srv://network:network123@network.gj3cqnf.mongodb.net/?retryWrites=true&w=majority";
//   // "mongodb+srv://admin:admin@cluster0.oksowxm.mongodb.net/?retryWrites=true&w=majority";

const DB_URI = "mongodb://localhost:27017/network";

const db = async () => {
  try {
    await mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB connection successful!"))
      .catch((err) => console.log("DB ERROR = ", err));
  } catch (error) {
    console.log(error);
  }
};
module.exports = db;
