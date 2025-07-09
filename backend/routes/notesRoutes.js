const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Note = require("../models/noteModel");

// ✅ Setup Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gyaan-notes",
    allowed_formats: ["pdf"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ✅ GET all notes
router.get("/all", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});



// DELETE a note by ID
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error while deleting" });
  }
});




// ✅ Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, session, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newNote = new Note({
      title,
      session,
      tags,
      fileUrl: req.file.path, // ✅ Cloudinary file URL
    });

    await newNote.save();

    return res.status(201).json({
      message: "Note uploaded",
      note: newNote,
    });
  } catch (err) {
    console.error("Upload error:", JSON.stringify(err, null, 2)); // readable in terminal

    // 🔥 FIX: send proper JSON response
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      full: err,
    });
  }

});

module.exports = router;
