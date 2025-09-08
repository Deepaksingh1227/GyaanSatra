const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors({
  origin: "https://evispheretech.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes should be declared BEFORE starting the server
const notesRoutes = require('./routes/notesRoutes');
app.use('/api/notes', notesRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const completedCoursesRoutes = require("./routes/completedCourses");
app.use("/api/completed-courses", completedCoursesRoutes);




// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("🚀 GyaanSatra Backend Running");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
