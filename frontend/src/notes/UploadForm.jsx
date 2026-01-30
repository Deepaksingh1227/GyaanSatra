import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const UploadForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({ title: "", session: "forensics" });
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);

  if (!user || user.role !== "admin") return null;

  const headers = { Authorization: `Bearer ${token}` };

  const fetchNotes = async (session) => {
    try {
      const res = await axios.get(`/api/notes/${session}`, { headers });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes(form.session);
  }, [form.session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("session", form.session);
    data.append("notefile", file);

    await axios.post("/api/notes/upload", data, { headers });
    alert("Note uploaded!");
    fetchNotes(form.session); // Refresh notes
  };

 const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this note?")) {
    try {
      const res = await axios.delete(`/api/notes/${id}`, { headers });
      alert("Note deleted successfully.");
      fetchNotes(form.session);
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete note. Check console.");
    }
  }
};


  return (
    <div className="container mt-5">
      <h4 className="mb-3 pt-5">Upload Notes (Admin Only)</h4>
      <form onSubmit={handleSubmit} className="mb-4 col-md-6">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="form-select mb-2"
          value={form.session}
          onChange={(e) => setForm({ ...form, session: e.target.value })}
        >
          <option value="forensics">Forensic Science</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="fullstack">Full Stack</option>
          <option value="backend">Backend Development</option>
        </select>
        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-success">Upload</button>
      </form>

      <h5 className="mb-3">Preview Notes ({form.session})</h5>
      <ul className="list-group">
        {notes.map((note) => (
          <li key={note._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{note.title}</strong> <br />
              <a href={note.Url} target="_blank" rel="noreferrer">Preview PDF</a>
            </div>
            <button onClick={() => handleDelete(note._id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadForm;
