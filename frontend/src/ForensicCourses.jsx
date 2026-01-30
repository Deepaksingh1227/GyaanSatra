// src/pages/ForensicCourses.jsx
import React from "react";
import abcd from "./images/abcd.jpg";
import PayButton from "./payment/PayButton"; // ✅ import reusable button

const forensicCourses = [
  {
    title: "Basics of Cyber Security",
    description: "Protect yourself and your digital world!",
    price: 999,
    image: abcd,
    category: "forensics", // 🧠 category for access
  },
];

function ForensicCourses({ onBack }) {
  return (
    <div className="container py-5">
      <h2 className="text-danger fw-bold mb-4">Forensic Science Courses</h2>
      <div className="row g-4">
        {forensicCourses.map((course, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-lg p-4 rounded-4 h-100">
              <img
                src={course.image}
                alt={course.title}
                className="card-img-top rounded-4 mb-3"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <h5 className="fw-semibold mb-2">{course.title}</h5>
              <p className="text-muted">{course.description}</p>
              <h6 className="text-primary fw-bold mb-3">
                ₹ {course.price.toLocaleString()}
              </h6>

              {/* ✅ Use central PayButton */}
              <PayButton category={course.category} />
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-outline-secondary mt-4" onClick={onBack}>
        🔙 Back to Courses
      </button>
    </div>
  );
}

export default ForensicCourses;
