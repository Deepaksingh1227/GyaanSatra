import React, { useState } from "react";
import "./course.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ IMPORT all special pages
import ForensicCourses from "../ForensicCourses";
import DSACourses from "../DSACourses";
import FrontendCourses from "../FrontendCourses";
import BackendCourses from "../BackendCourses";

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
  const [activeSpecial, setActiveSpecial] = useState("");

  const handleEnrollClick = (course) => {
    switch (course.title) {
      case "Forensic Science":
        setActiveSpecial("forensic");
        break;
      case "Data Structures & Algorithms":
        setActiveSpecial("dsa");
        break;
      case "Frontend Development":
        setActiveSpecial("frontend");
        break;
      case "Backend Development":
        setActiveSpecial("backend");
        break;
      default:
        alert(`Enroll Now clicked for ${course.title}`);
    }
  };

  const renderCourses = () => (
    <div className="course-scroll-container">
      {courses.map((course, idx) => (
        <motion.div
          key={idx}
          className="course-scroll-card-wrapper"
          initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
        >
          <div className="course-card p-4 rounded-4 h-100">
            <div className="course-icon mb-3 fs-2">{course.icon}</div>
            <h4 className="text-primary fw-semibold">{course.title}</h4>
            <p className="text-muted">{course.description}</p>
            <ul className="text-start ps-4">
              {course.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button
              className="btn btn-warning fw-semibold mt-3 enroll-btn"
              onClick={() => handleEnrollClick(course)}
            >
              Enroll Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="container py-5 text-center">
      {activeSpecial === "forensic" && <ForensicCourses onBack={() => setActiveSpecial("")} />}
      {activeSpecial === "dsa" && <DSACourses onBack={() => setActiveSpecial("")} />}
      {activeSpecial === "frontend" && <FrontendCourses onBack={() => setActiveSpecial("")} />}
      {activeSpecial === "backend" && <BackendCourses onBack={() => setActiveSpecial("")} />}

      {!activeSpecial && (
        <>
          <div className="tab-group mb-5 d-flex justify-content-center gap-3 flex-wrap">
            <button className="tab-modern active">🎓 Courses</button>
            <button className="tab-modern" onClick={() => navigate("/notes")}>
              📘 Study Notes
            </button>
            <button className="tab-modern" onClick={() => navigate("/quiz")}>
              📝 Practice Quizzes
            </button>
            <Button className="tab-modern" onClick={() => navigate("/previous-courses")}>
              📚 Previous Courses
            </Button>
          </div>

          <motion.h2
            className="text-danger fw-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Premium Courses
          </motion.h2>
          <motion.p
            className="text-muted mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Comprehensive learning paths designed to transform your career in technology and forensic science.
          </motion.p>

          {renderCourses()}
        </>
      )}
    </div>
  );
}

export default CourseSection;
