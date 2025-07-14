const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadNote = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "gyaansatra_notes"
  });
  fs.unlinkSync(req.file.path); // delete local

  const note = await Note.create({
    title: req.body.title,
    url: result.secure_url,
    session: req.body.session
  });
  res.json(note);
};

exports.getNotesBySession = async (req, res) => {
  const notes = await Note.find({ session: req.params.session });
  res.json(notes);
};
