// src/notes/UploadForm.jsx
import React, { useState } from "react";
import axios from "../api/axios"; // ✅ custom axios instance

const UploadForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ title: "", session: "forensics" });
  const [file, setFile] = useState(null);

  if (!user || user.role !== "admin") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("session", form.session);
    data.append("file", file);

    await axios.post("/api/notes/upload", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Note uploaded!");
  };

  return (
    <div className="container mt-5 col-md-6">
      <h4 className="mb-3 pt-5">Upload Notes (Admin Only)</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="form-select mb-2" value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })}>
          <option value="forensics">Forensic Science</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="fullstack">Full Stack</option>
          <option value="backend">Backend Development</option>
        </select>
        <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn btn-success">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
