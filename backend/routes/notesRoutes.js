const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const { uploadNote, getNotesBySession, deleteNote } = require('../controllers/notesController');

router.post('/upload', auth, upload.single("file"), uploadNote);
router.get('/:session', auth, getNotesBySession);
router.delete("/:id", auth, deleteNote);

module.exports = router;
