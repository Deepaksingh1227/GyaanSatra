import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

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
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">📘 Previously Completed Courses</h2>

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
              <Card className="shadow-sm h-50">
                {course.image && (
                  <Card.Img
                    variant="top"
                    src={course.image}
                    alt={course.title}
                    style={{ height: "300px", objectFit:"" }}
                  />
                )}
                <Card.Body>
                  <Card.Title className="fw-bold fs-5">{course.title}</Card.Title>
                  <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                    {course.description}
                  </Card.Text>
                  <p className="mb-1">
                    <strong>📅 Last Date:</strong>{" "}
                    {course.lastDate
                      ? new Date(course.lastDate).toLocaleDateString()
                      : "Not specified"}
                  </p>
                  <a
                    href={course.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary mt-2"
                  >
                    🔗 Register Now
                  </a>
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
