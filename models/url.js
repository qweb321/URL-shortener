const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  urlID: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    reuired: true,
  },
});

module.exports = mongoose.model("Url", UrlSchema);
