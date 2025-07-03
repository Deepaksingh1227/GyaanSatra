import React from "react";
import "./NotesCards.css"; // Add your styles here

const NotesCards = () => {
  return (
    <div className="notes-cards-container">
      {/* Forensic Science Notes */}
      <div className="card forensic-card">
        <h3>🔬 Forensic Science Notes</h3>
        <div className="card-content">
          <h4>Chapter 1: History of Forensic Science</h4>
          <p>Introduction to forensic science fundamentals</p>
          <a href="#">View PDF Notes</a>
        </div>
        <button>Download All Notes</button>
      </div>

      {/* DSA Study Materials */}
      <div className="card dsa-card">
        <h3>🧬 DSA Study Materials</h3>
        <p>Comprehensive notes on data structures and algorithms</p>
        <button>Access Notes</button>
      </div>

      {/* Web Dev Resources */}
      <div className="card webdev-card">
        <h3>💻 Web Dev Resources</h3>
        <p>Frontend and backend development guides</p>
        <button>View Resources</button>
      </div>
    </div>
  );
};

export default NotesCards;
