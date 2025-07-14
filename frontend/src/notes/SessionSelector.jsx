// src/notes/SessionSelector.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const sessions = [
  { key: "forensics", name: "Forensic Science" },
  { key: "cybersecurity", name: "Cybersecurity" },
  { key: "fullstack", name: "Full Stack" },
  { key: "backend", name: "Backend Development" }
];

const SessionSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-danger pt-5">Select a Session</h2>
      <div className="row">
        {sessions.map((session) => (
          <div className="col-md-6 mb-4" key={session.key}>
            <div className="card p-4 shadow-sm">
              <h5 className="card-title">{session.name}</h5>
              <p className="card-text">Access premium notes</p>
              <button className="btn btn-outline-primary" onClick={() => navigate(`/session/${session.key}`)}>View & Pay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionSelector;
