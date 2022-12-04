const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://network:network123@network.gj3cqnf.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://admin:admin@cluster0.oksowxm.mongodb.net/?retryWrites=true&w=majority";

const db = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.log(err));
};
module.exports = db;
