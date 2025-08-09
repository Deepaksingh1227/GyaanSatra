import React, { useState } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import UploadForm from "../notes/UploadForm"; // ✅ Notes uploader
import AdminUploadCourse from "../previousCourses/AdminUploadCourse"; // ✅ Course uploader

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [view, setView] = useState("notes");

  if (!user || user.email !== "divyanthakur856@gmail.com") {
    return (
      <Container className="mt-5 pt-5 text-center">
        <h4>⛔ Access Denied</h4>
        <p>This page is restricted to admin only.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">⚙️ Admin Dashboard</h2>

      <ButtonGroup className="mb-4 d-flex justify-content-center">
        <Button
          variant={view === "notes" ? "primary" : "outline-primary"}
          onClick={() => setView("notes")}
        >
          📝 Upload Notes
        </Button>
        <Button
          variant={view === "courses" ? "primary" : "outline-primary"}
          onClick={() => setView("courses")}
        >
          🎓 Upload Courses
        </Button>
      </ButtonGroup>

      {view === "notes" ? <UploadForm /> : <AdminUploadCourse />}
    </Container>
  );
};

export default AdminDashboard;
