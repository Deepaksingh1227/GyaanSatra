import React, { useRef } from 'react';
import './Contact.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fvvdwy4', 'template_nj4enpi', form.current, {
        publicKey: 'ZobDTBact8EEFw5MQ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("Message sent successfully!");
          form.current.reset(); // Optional: Clear form after submission
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Message sending failed. Please try again.");
        }
      );
  };

  return (
    <div className="contact-section py-5">
      <Container>
        <h2 className="text-center section-title mt-5">Get In Touch</h2>
        <p className="text-center section-subtitle mb-5">
          Ready to start your learning journey? Contact us today and transform your career with expert guidance.
        </p>
        <Row className="gy-4">
          <Col md={6}>
            <Card className="contact-card form-card shadow-sm">
              <Card.Body>
                <h4 className="contact-title">Send us a Message</h4>
                <p className="contact-subtitle">We'll get back to you within 24 hours</p>
                <Form ref={form} onSubmit={sendEmail}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="from_name" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="your.email@example.com" name="from_email" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Tell us about your learning goals..." name="message" required />
                  </Form.Group>
                  <Button className="send-btn w-100" type="submit">
                    <FaPaperPlane className="me-2" /> Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="contact-card info-card shadow-sm mb-4">
              <Card.Body>
                <h4 className="contact-title">Contact Information</h4>
                <div className="info-item">
                  <FaEnvelope className="icon" />
                  <div>
                    <strong>Email</strong>
                    <p>ceogyaansatra@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhoneAlt className="icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>+91 9872999283</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="icon" />
                  <div>
                    <strong>Visit Us</strong>
                    <p>Dehradun, Uttarakhand, India</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="contact-card social-card shadow-sm">
              <Card.Body>
                <h4 className="contact-title">Follow Us</h4>
                <p>Connect with us on social media</p>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/evi-sphere?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app " className="linkedin"><FaLinkedin /></a>
                  <a href="https://www.instagram.com/evispheretech?igsh=eDRzeXB0YmVnc2Nz&utm_source=qr " className="instagram"><FaInstagram /></a>
                  <a href="https://www.youtube.com/@Episheretech " className="youtube"><FaYoutube /></a> 
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
