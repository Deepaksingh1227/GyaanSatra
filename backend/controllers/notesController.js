const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Please select a PDF file." });
    }

    console.log("Uploading to Cloudinary:", req.file.path);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gyaansatra_notes",
      resource_type: "auto", // Changed to auto to handle PDFs better
    });

    console.log("Cloudinary Upload Success:", result.secure_url);

    // Try to delete local file after upload
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (fsErr) {
      console.error("Local file deletion error:", fsErr);
    }

    const note = await Note.create({
      title: req.body.title,
      url: result.secure_url,
      session: req.body.session,
      cloudinaryId: result.public_id
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      error: "Failed to upload note",
      details: error.message
    });
  }
};

exports.getNotesBySession = async (req, res) => {
  try {
    const notes = await Note.find({ session: req.params.session });
    res.json(notes);
  } catch (error) {
    console.error("Fetch Notes Error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 1. Delete from Cloudinary if cloudinaryId exists
    if (note.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(note.cloudinaryId);
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
      }
    }

    // 2. Delete from MongoDB
    await Note.findByIdAndDelete(req.params.id);

    return res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete note" });
  }
};

