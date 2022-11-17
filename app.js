const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Url = require("./models/url");
const shortenID = require("./modules/shortenID");

require("./config/mongoose");
const port = 3000;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use("/public", express.static("public"));
app.use(express.static("node_modules/sweetalert2"));

app.get("/", (req, res) => {
  const image = { src: "images/link-icon.png" };
  res.render("index", { image });
});

app.post("/", (req, res) => {
  const image = { src: "images/link-icon.png" };
  let shortenId = shortenID();
  //check shortenID exist or not
  Url.findOne({ urlID: shortenId }).then((id) => {
    if (id) {
      // if shortenId alreddy exist in database, create new one
      shortenId = shortenID();
    }
  });
  // check url exist or not
  Url.findOne({ url: req.body.url })
    .lean()
    .then((url) => {
      if (!url) {
        Url.insertMany({ urlID: shortenId, url: req.body.url }).then(() =>
          res.render("shorten", { url, shortenId, image })
        );
      } else {
        res.render("shorten", { url, shortenId: url.urlID, image });
      }
    });
});

app.get("/:id", (req, res) => {
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
