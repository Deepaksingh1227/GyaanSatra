import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import abcd from "./images/abcd.png";
import new1 from "./images/new1.png";
import new2 from "./images/new2.png";
import new3 from "./images/new3.png";
const forensicCourses = [
  {
    title: "Basics of Cyber Security",
    description:
      "Protect yourself and your digital world! Join our Basics of Cybersecurity course designed to build a strong foundation in online safety and security.",
    price: 499,
    image: abcd,
  }
  // ,
  // {
  //   title: "Crime Scene Investigation",
  //   description: "Learn how to secure, document, and analyze crime scenes.",
  //   price: 4999,
  //   image: new1,
  // },
  // {
  //   title: "Forensic Toxicology",
  //   description: "Study the detection and effects of toxins and drugs.",
  //   price: 3999,
  //   image: new2,
  // },
  // {
  //   title: "Digital Forensics",
  //   description: "Master recovering and investigating material on digital devices.",
  //   price: 5999,
  //   image: new3,
  // },
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

export default ForensicCourses;
