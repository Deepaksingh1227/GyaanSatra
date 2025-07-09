// backend/models/noteModel.js

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  session: { type: String, required: true },
  tags: { type: String },
  fileUrl: { type: String, required: true },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
