const multer = require("multer");

// Storage config – just use temp 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// File filter – only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // ✅ Accept PDF
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // ❌ Reject others
  }
};

// Final upload config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Optional: 5MB max
  }
});

module.exports = upload;
