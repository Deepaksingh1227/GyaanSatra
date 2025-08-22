import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "./PreviousCourses.css"; // custom styles

const PreviousCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/completed-courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="previous-courses-container">
      <h2 className="section-title">📘 Previously Completed Courses</h2>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : courses.length === 0 ? (
        <Alert variant="info" className="text-center">
          No completed courses available at the moment.
        </Alert>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col md={6} lg={4} key={course._id} className="mb-4">
              <Card className="course-card h-100 shadow-sm">
                {course.image && (
                  <div className="course-img-wrapper">
                    <Card.Img
                      variant="top"
                      src={course.image}
                      alt={course.title}
                      className="course-img"
                    />
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="course-title">
                    {course.title}
                  </Card.Title>
                  <Card.Text className="course-description">
                    {course.description}
                  </Card.Text>
                  <p className="course-date mt-auto">
                    <strong>📅 Last Date:</strong>{" "}
                    {course.lastDate
                      ? new Date(course.lastDate).toLocaleDateString()
                      : "Not specified"}
                  </p>
                  {course.registrationLink && (
                    <a
                      href={course.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary w-100"
                    >
                      🔗 Register Now
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PreviousCourses;
