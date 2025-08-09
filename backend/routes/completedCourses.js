const express = require("express");
const router = express.Router();
const CompletedCourse = require("../models/CompletedCourse");
const { auth } = require("../middleware/authMiddleware"); // ✅ Your existing middleware

// Custom admin check (hardcoded email-based)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.email === "divyanthakur856@gmail.com") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

// GET all completed courses
router.get("/", async (req, res) => {
  try {
    const courses = await CompletedCourse.find().sort({ _id: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch completed courses" });
  }
});

// POST a new completed course (admin only)
router.post("/", auth, isAdmin, async (req, res) => {
  const { title, description, lastDate, registrationLink, image } = req.body;

  if (!title || !description || !lastDate || !registrationLink || !image) {
    return res.status(400).json({ message: "All fields including image are required" });
  }

  try {
    const newCourse = new CompletedCourse({
      title,
      description,
      lastDate,
      registrationLink,
      image,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Course upload failed" });
  }
});

module.exports = router;
