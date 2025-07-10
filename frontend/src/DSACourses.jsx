import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const dsaCourses = [
  {
    title: "DSA Foundations",
    description: "Master the fundamentals of data structures and algorithms.",
    price: 3999,
  },
  {
    title: "Advanced Algorithms",
    description: "Dive deep into complex algorithms and optimizations.",
    price: 4999,
  },
  {
    title: "Competitive Programming",
    description: "Get ready for coding competitions and interviews.",
    price: 5999,
  },
];

function DSACourses({ onBack }) {
  return (
    <div className="container py-5">
      <h2 className="text-danger fw-bold mb-4">Data Structures & Algorithms Courses</h2>
      <div className="row g-4">
        {dsaCourses.map((course, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-lg p-4 rounded-4 h-100">
              <h5 className="fw-semibold mb-2">{course.title}</h5>
              <p className="text-muted">{course.description}</p>
              <h6 className="text-primary fw-bold mb-3">
                ₹ {course.price.toLocaleString()}
              </h6>
              <button className="btn btn-success fw-semibold">
                Buy Now
              </button>
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

export default DSACourses;
