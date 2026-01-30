import React, { useState } from "react";
import axios from "../api/axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const AdminUploadCourse = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    lastDate: "",
    registrationLink: "",
  });

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Only admin can access
  if (!user || user.email !== "divyanthakur856@gmail.com") {
    return (
      <Container className="mt-5 pt-5 text-center">
        <Alert variant="danger">⛔ Access denied. Only admin can upload courses.</Alert>
      </Container>
    );
  }

  // ☁️ Upload image to Cloudinary
 const uploadImageToCloudinary = async () => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "Course_image"); // Unsigned preset
  data.append("cloud_name", "debn7l5yh");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/debn7l5yh/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.secure_url;
};


  // ⬆️ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.lastDate || !form.registrationLink || !image) {
      setError("⚠️ All fields including image are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const imageUrl = await uploadImageToCloudinary();

      await axios.post(
        "/api/completed-courses",
        { ...form, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("✅ Course uploaded successfully!");
      setForm({ title: "", description: "", lastDate: "", registrationLink: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      setError("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <h3 className="mb-4">📤 Upload a Completed Course</h3>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>📘 Course Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>📝 Course Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter course description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>📅 Last Date of Registration</Form.Label>
          <Form.Control
            type="date"
            value={form.lastDate}
            onChange={(e) => setForm({ ...form, lastDate: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>🔗 Registration Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://your-course-registration.com"
            value={form.registrationLink}
            onChange={(e) => setForm({ ...form, registrationLink: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>🖼 Upload Poster / Course Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" disabled={loading} variant="primary">
          {loading ? "Uploading..." : "Upload Course"}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminUploadCourse;
