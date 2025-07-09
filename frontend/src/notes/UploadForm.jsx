import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function UploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [session, setSession] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("session", session);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/notes/upload", formData);
      setMessage("✅ Note uploaded successfully!");
      setTitle("");
      setSession("");
      setFile(null);
      onUpload(); // refetch notes
    } catch (err) {
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="p-3 bg-light rounded mb-4 shadow ">
      <h4>Upload a New Note</h4>
      {message && <Alert>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Session</Form.Label>
          <Form.Control value={session} onChange={(e) => setSession(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>PDF File</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </Form.Group>
        <Button type="submit" variant="success">Upload</Button>
      </Form>
    </div>
  );
}

export default UploadForm;
