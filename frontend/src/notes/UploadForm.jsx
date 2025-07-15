// src/notes/UploadForm.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // ✅ custom axios instance

const UploadForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({ title: "", session: "forensics" });
  const [file, setFile] = useState(null);
  const [notesBySession, setNotesBySession] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");

  if (!user || user.role !== "admin") return null;

  const fetchAllNotes = async () => {
    try {
      const res = await axios.get("https://gyaansatra-backend.onrender.com/api/notes/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Group notes by session
      const grouped = res.data.reduce((acc, note) => {
        acc[note.session] = acc[note.session] || [];
        acc[note.session].push(note);
        return acc;
      }, {});
      setNotesBySession(grouped);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const data = new FormData();
    data.append("title", form.title);
    data.append("session", form.session);
    data.append("file", file);

    try {
      await axios.post("https://gyaansatra-backend.onrender.com/api/notes/upload", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Note uploaded!");
      setForm({ title: "", session: "forensics" });
      setFile(null);
      fetchAllNotes();
    } catch (err) {
      alert("Failed to upload note.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`https://gyaansatra-backend.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllNotes();
    } catch (err) {
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="container mt-5 col-md-8">
      <h4 className="mb-3 pt-5">Upload Notes (Admin Only)</h4>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-success mb-4" type="submit">
          Upload
        </button>
      </form>

      <hr />
      <h5 className="mb-3">Manage Uploaded Notes</h5>

      {Object.keys(notesBySession).length === 0 && <p>No notes uploaded yet.</p>}

      {Object.keys(notesBySession).map((session) => (
        <div key={session} className="mb-4">
          <h6 className="text-capitalize">{session} Notes</h6>
          <div className="row">
            {notesBySession[session].map((note) => (
              <div key={note._id} className="col-md-6 mb-3">
                <div className="card p-3 shadow-sm">
                  <strong>{note.title}</strong>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setPreviewUrl(note.url)}
                    >
                      Preview
                    </button>
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-success"
                    >
                      Download
                    </a>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewUrl("")}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Preview Note</h5>
                <button className="btn-close" onClick={() => setPreviewUrl("")}></button>
              </div>
              <div className="modal-body">
                <iframe
                  src={previewUrl}
                  title="Preview"
                  width="100%"
                  height="600px"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
