const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadNote = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "gyaansatra_notes",
    resource_type: "raw",
    type: "upload",
  });
  fs.unlinkSync(req.file.path); // delete local

  const note = await Note.create({
    title: req.body.title,
    url: result.secure_url,
    session: req.body.session,
    cloudinaryId: result.public_id
    



  });
  res.json(note);
};

exports.getNotesBySession = async (req, res) => {
  const notes = await Note.find({ session: req.params.session });
  res.json(notes);
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 1. Delete from Cloudinary if cloudinaryId exists
    if (note.cloudinaryId) {
      await cloudinary.uploader.destroy(note.cloudinaryId);
    }

    // 2. Delete from MongoDB
    await Note.findByIdAndDelete(req.params.id);

    return res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete note" });
  }
};

