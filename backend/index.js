const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// ✅ Middleware
const allowedOrigins = [
  "https://evispheretech.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes should be declared BEFORE starting the server
const notesRoutes = require("./routes/notesRoutes");
app.use("/api/notes", notesRoutes);

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

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
