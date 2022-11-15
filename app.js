const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb successfully!");
});

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const url = req.body.url;
  const lowerLetter = "abcdefghijklmnopqrstuvwxyz";
  const upperLetter = lowerLetter.toUpperCase();
  const numbers = "1234567890";
  const randomList = lowerLetter.concat(upperLetter, numbers).split("");
  // create five random numbers
  let shortenId = "";
  for (let i = 0; i < 5; i++) {
    shortenId += randomList[Math.floor(Math.random() * randomList.length)];
  }
  console.log(shortenId);
  res.render("shorten", { url, shortenId });
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
