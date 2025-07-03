import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMicroscope, FaCodeBranch, FaLaptopCode, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AboutMain.css';

function AboutMain() {
  const cards = [
    {
      icon: <FaMicroscope size={28} />,
      title: 'Forensic Excellence',
      desc: 'Advanced forensic science education with modern analysis methods and techniques.',
    },
    {
      icon: <FaCodeBranch size={28} />,
      title: 'DSA Mastery',
      desc: 'Comprehensive DSA training for competitive programming and coding excellence.',
    },
    {
      icon: <FaLaptopCode size={28} />,
      title: 'Web Development',
      desc: 'Full-stack web development including frontend, backend, and deployment.',
    },
    {
      icon: <FaAward size={28} />,
      title: 'Proven Results',
      desc: 'Track record of excellence among students in various specialized fields.',
    },
  ];

  return (
    <section className="about-section py-5">
      <Container className="text-center">
        <motion.h2 
          className="about-title"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          About <span className="highlight">Gyaan Satra</span>
        </motion.h2>
        <motion.p 
          className="about-subtitle"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
        >
          <span className="tagline">"On The Path Of Truth"</span> – Gyaan Satra represents the confluence of knowledge and action where learning meets implementation.
        </motion.p>

        <Row className="mt-5 g-4 justify-content-center">
          {cards.map((card, index) => (
            <Col md={6} lg={3} key={index}>
              <motion.div
                className="about-card p-4 rounded-4 text-center shadow-sm h-100"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="icon-box mb-3">{card.icon}</div>
                <h5 className="fw-bold mb-2">{card.title}</h5>
                <p className="text-muted">{card.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="mission-section">
            <h2>Our Mission</h2>
            <p>
                To create a comprehensive learning ecosystem where knowledge transforms into expertise,
                where students master forensic science, programming fundamentals, and web development through
                structured curriculum and hands-on practice.
            </p>
            <div className="mission-stats">
                <div className="stat-box">
                <h3>500+</h3>
                <span>Students Trained</span>
                </div>
                <div className="stat-box">
                <h3>3</h3>
                <span>Specialized Courses</span>
                </div>
                <div className="stat-box">
                <h3>95%</h3>
                <span>Success Rate</span>
                </div>
            </div>
        </div>
    </section>
    
  );
}

export default AboutMain;
