const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  url: String,
  session: String
});

module.exports = mongoose.model("Note", noteSchema);
