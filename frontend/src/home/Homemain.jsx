import React from 'react';
import './Home.css'; 
import logo from '../assets/gyaansatralogo.jpg';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaStar, FaArrowRight, FaCode, FaFlask, FaLaptopCode } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';




function Homemain() {
  return (
    <div>
        
        <div className="homepage-wrapper py-5 mt-5">
            <Container className="text-center">
                {/* Logo Section */}
                <div className="logo-wrapper mb-3">
                <img src={logo} alt="Logo" className="homepage-logo" />
                </div>
                {/* Premium Knowledge Tagline */}
                <div className="d-flex justify-content-center align-items-center mb-3">
                <FaStar className="text-warning me-2" size={24} />
                <span className="text-secondary fw-semibold fs-5">Premium Knowledge Platform</span>
                <FaStar className="text-warning ms-2" size={24} />
                </div>

                {/* Main Heading */}
               <h1 className="main-heading fancy-fade-heading Headings">GYAAN SATRA</h1>



                {/* Sub Heading */}
                <p className="lead text-secondary mb-4">
                On The Path Of Truth - Empowering minds through structured learning in
                <strong> Forensic Science</strong>, <strong>DSA</strong>, and <strong>Web Development</strong>.
                </p>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
                <Button variant="warning" className="px-4 fw-bold shadow hover-grow">
                    Explore Premium Courses <FaArrowRight className="ms-2" />
                </Button>
                <Button variant="outline-warning" className="px-4 fw-bold shadow hover-border-grow">
                    Meet Our Founder
                </Button>
                </div>

                {/* Card Section */}
                <Row className="g-4">
                <Col md={4}>
                    <Card className="card-hover border-warning shadow-sm">
                    <Card.Body className="text-center">
                        <FaFlask size={40} className="text-warning mb-3" />
                        <Card.Title className="fw-bold text-dark">Forensic Science</Card.Title>
                        <Card.Text className="text-secondary">
                        Advanced forensic investigation and scientific research techniques.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="card-hover border-danger shadow-sm">
                    <Card.Body className="text-center">
                        <FaCode size={40} className="text-danger mb-3" />
                        <Card.Title className="fw-bold text-dark">DSA & Programming</Card.Title>
                        <Card.Text className="text-secondary">
                        Learn Data Structures and Algorithms with practical problem-solving.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="card-hover border-info shadow-sm">
                    <Card.Body className="text-center">
                        <FaLaptopCode size={40} className="text-info mb-3" />
                        <Card.Title className="fw-bold text-dark">Web Development</Card.Title>
                        <Card.Text className="text-secondary">
                        Full-stack web development from design to deployment.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
        </div>
    </div>
  );

}

export default Homemain;