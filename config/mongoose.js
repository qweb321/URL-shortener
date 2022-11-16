const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb successfully!");
});

module.export = db;
