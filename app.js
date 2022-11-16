const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Url = require("./models/url");
const shortenID = require("./modules/shortenID");
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
  let shortenId = shortenID();
  //check shortenID exist or not
  Url.findOne({ urlID: shortenId }).then((id) => {
    if (id) {
      console.log("exist");
      console.log(shortenId);
    } else {
      console.log("not exist");
      shortenId = shortenID();
    }
  });
  // check url exist or not
  Url.findOne({ url: req.body.url })
    .lean()
    .then((url) => {
      if (!url) {
        Url.insertMany({ urlID: shortenId, url: req.body.url }).then(() =>
          res.render("shorten", { url, shortenId })
        );
      } else {
        console.log(url);
        res.render("shorten", { url, shortenId: url.urlID });
      }
    });
});

app.get("/urlshorten/:id", (req, res) => {
  const id = req.params.id;
  Url.findOne({ urlID: id })
    .lean()
    .then((url) => {
      res.redirect(url.url);
    })
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
