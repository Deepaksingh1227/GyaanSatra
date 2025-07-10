import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const forensicCourses = [
  {
    title: "Crime Scene Investigation",
    description: "Learn how to secure, document, and analyze crime scenes.",
    price: 4999,
  },
  {
    title: "Forensic Toxicology",
    description: "Study the detection and effects of toxins and drugs.",
    price: 3999,
  },
  {
    title: "Digital Forensics",
    description: "Master recovering and investigating material on digital devices.",
    price: 5999,
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

export default ForensicCourses;
