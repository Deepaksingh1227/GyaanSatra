import React, { useState } from 'react';
import './Home.css';
import logo from '../assets/gyaansatralogo.jpg';
import { Container, Button, Card } from 'react-bootstrap';
import { FaStar, FaArrowRight, FaCode, FaFlask, FaLaptopCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroIntro from '../HeroIntro';

function Homemain() {
  const navigate = useNavigate();
  const [showMain, setShowMain] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  if (!showMain) return <HeroIntro onEnter={() => setShowMain(true)} />;

  return (
    <div className="homepage-wrapper py-5 mt-5">
      <Container className="text-center">
        <motion.div
          className="logo-wrapper mb-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <img src={logo} alt="Logo" className="homepage-logo" />
        </motion.div>

        <motion.div
          className="d-flex justify-content-center align-items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
         
          <span className="text-secondary fw-semibold fs-5">On The Path Of Truth</span>
          
        </motion.div>

        <motion.h1
          className="main-heading fancy-fade-heading Headings"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 1 }}
        >
          GYAAN SATRA
        </motion.h1>

        <motion.p
          className="lead text-secondary mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Empowering minds through structured learning in
          <strong> Forensic Science</strong>, <strong>DSA</strong>, and{' '}
          <strong>Web Development</strong>.
        </motion.p>

        <motion.div
          className="d-flex justify-content-center gap-3 flex-wrap mb-5"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Button
            variant="warning"
            className="px-4 fw-bold shadow hover-grow"
            onClick={() => navigate('/premiumcourses')}
          >
            Explore Premium Courses <FaArrowRight className="ms-2" />
          </Button>
          <Button
            variant="outline-warning"
            className="px-4 fw-bold shadow hover-border-grow"
            onClick={() => navigate('/MeetOurCEO')}
          >
            Meet Our Founder
          </Button>
          <Button
            variant="outline-info"
            className="px-4 fw-bold shadow hover-border-grow"
            onClick={() => navigate('/communitypartners')}
          >
            Meet Our Community Partners
          </Button>
        </motion.div>

        {/* 🔁 Continuously Scrolling Cards */}
        <motion.div
          className="scrolling-cards-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="scrolling-cards-wrapper">
            <div className="scrolling-cards">
              {[...Array(2)].flatMap(() => [
                {
                  icon: <FaFlask size={40} className="text-warning mb-3" />,
                  title: 'Forensic Science',
                  desc: 'Advanced forensic investigation and research techniques.',
                  border: 'border-warning'
                },
                {
                  icon: <FaCode size={40} className="text-danger mb-3" />,
                  title: 'DSA & Programming',
                  desc: 'Master Data Structures and problem-solving.',
                  border: 'border-danger'
                },
                {
                  icon: <FaLaptopCode size={40} className="text-info mb-3" />,
                  title: 'Web Development',
                  desc: 'Frontend + Backend development & deployment.',
                  border: 'border-info'
                }
              ]).map((card, idx) => (
                <Card key={idx} className={`card-hover ${card.border} shadow-sm`}>
                  <Card.Body className="text-center">
                    {card.icon}
                    {/* ✅ Changed from text-dark to text-white */}
                    <Card.Title className="fw-bold text-white">{card.title}</Card.Title>
                    <Card.Text className="text-secondary">{card.desc}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default Homemain;
