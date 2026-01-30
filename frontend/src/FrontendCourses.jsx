import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const frontendCourses = [
  {
    title: "React Mastery",
    description: "Master building dynamic UIs with React.",
    price: 4999,
  },
  {
    title: "Next.js & SSR",
    description: "Build production-ready apps with Next.js.",
    price: 5999,
  },
  {
    title: "UI/UX Design",
    description: "Learn to design beautiful, user-friendly interfaces.",
    price: 3999,
  },
];

function FrontendCourses({ onBack }) {
  return (
    <div className="container py-5">
      <h2 className="text-danger fw-bold mb-4">Frontend Development Courses</h2>
      <div className="row g-4">
        {frontendCourses.map((course, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-lg p-4 rounded-4 h-100">
              <h5 className="fw-semibold mb-2">{course.title}</h5>
              <p className="text-muted">{course.description}</p>
              <h6 className="text-primary fw-bold mb-3">
                ₹ {course.price.toLocaleString()}
              </h6>
              <button className="btn btn-success fw-semibold">Buy Now</button>
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

export default FrontendCourses;
