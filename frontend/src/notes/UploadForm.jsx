import React, { useState, useEffect } from "react";
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
      const res = await axios.get("/api/notes/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const grouped = res.data.reduce((acc, note) => {
        if (!acc[note.session]) acc[note.session] = [];
        acc[note.session].push(note);
        return acc;
      }, {});

      setNotesBySession(grouped);
    } catch (err) {
      console.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

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
    setForm({ title: "", session: "forensics" });
    setFile(null);
    fetchAllNotes();
  };

  const handleDelete = async (noteId) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Note deleted.");
      fetchAllNotes();
    } catch {
      alert("Failed to delete note");
    }
  };

  return (
    <div className="container mt-5 col-md-8">
      <h4 className="mb-3 pt-5">Upload Notes (Admin Only)</h4>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
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
          required
        />
        <button className="btn btn-success">Upload</button>
      </form>

      {/* Notes Management Section */}
      <hr className="my-4" />
      <h5>Manage Uploaded Notes</h5>

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

      {/* Preview Modal */}
      {previewUrl && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewUrl("")}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PDF Preview</h5>
                <button className="btn-close" onClick={() => setPreviewUrl("")}></button>
              </div>
              <div className="modal-body" style={{ height: "80vh" }}>
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  style={{ width: "100%", height: "100%" }}
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
