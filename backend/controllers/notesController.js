const Note = require('../models/Note');

const uploadNote = async (req, res) => {
  try {
    const { title, session } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newNote = new Note({
      title,
      session,
      fileUrl,
      uploadedBy: req.user.email,
    });

    await newNote.save();

    res.status(201).json({ message: "Note uploaded successfully", note: newNote });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload note" });
  }
};

module.exports = { uploadNote };
