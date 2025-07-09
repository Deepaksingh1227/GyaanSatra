import React, { useState } from "react";
import "./course.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "Forensic Science",
    icon: "🔬",
    description: "Master the art of scientific investigation and evidence analysis",
    points: ["Crime Scene Investigation", "Evidence Analysis", "Forensic Techniques", "Criminal Profiling"],
  },
  {
    title: "Data Structures & Algorithms",
    icon: "🧠",
    description: "Build strong programming foundations with DSA mastery",
    points: ["Arrays & Linked Lists", "Trees & Graphs", "Sorting & Searching", "Dynamic Programming"],
  },
  {
    title: "Frontend Development",
    icon: "💻",
    description: "Create beautiful and responsive user interfaces",
    points: ["React & Next.js", "TypeScript", "Tailwind CSS", "Modern UI/UX"],
  },
  {
    title: "Backend Development",
    icon: "🗄️",
    description: "Build robust server-side applications and APIs",
    points: ["Node.js & Express", "Database Design", "API Development", "Cloud Deployment"],
  },
];

function CourseSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  const renderCourses = () => (
    <div className="row g-4">
      {courses.map((course, idx) => (
        <div className="col-md-6 col-lg-6" key={idx}>
          <div className="course-card shadow-lg p-4 rounded-4 h-100 animated-card">
            <div className="course-icon mb-3 fs-2">{course.icon}</div>
            <h4 className="text-primary fw-semibold">{course.title}</h4>
            <p className="text-muted">{course.description}</p>
            <ul className="text-start ps-4">
              {course.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button className="btn btn-warning fw-semibold mt-3 enroll-btn">
              Enroll Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container py-5 text-center">
      {/* Tabs */}
      <div className="tab-group mb-5 d-flex justify-content-center gap-3 flex-wrap">
        <button
          className={`tab-modern ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          🎓 Courses
        </button>
        <button
          className="tab-modern"
          onClick={() => navigate("/notes")}
        >
          📘 Study Notes
        </button>
        <button
          className="tab-modern"
          onClick={() => navigate("/quiz")}
        >
          📝 Practice Quizzes
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-danger fw-bold mb-2">Our Premium Courses</h2>
      <p className="text-muted mb-5">
        Comprehensive learning paths designed to transform your career in technology and forensic science
      </p>

      {/* Course Cards */}
      {activeTab === "courses" && renderCourses()}
    </div>
  );
}

export default CourseSection;
