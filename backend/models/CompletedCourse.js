const mongoose = require("mongoose");

const CompletedCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  registrationLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CompletedCourse", CompletedCourseSchema);
