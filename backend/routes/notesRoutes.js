const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const { uploadNote, getNotesBySession } = require('../controllers/notesController');

router.post('/upload', auth, upload.single("file"), uploadNote);
router.get('/:session', auth, getNotesBySession);

module.exports = router;
