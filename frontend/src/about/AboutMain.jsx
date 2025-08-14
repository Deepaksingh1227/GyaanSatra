import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FaMicroscope, FaCodeBranch, FaLaptopCode, FaAward } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import './AboutMain.css';

function Counter({ target, duration, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 10);
    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);
    return () => clearInterval(counter);
  }, [isInView, target, duration]);

  return (
    <h3 ref={ref} className="count-number">
      {count.toLocaleString()}{suffix}
    </h3>
  );
}

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
      <div className="glow-circle glow-1"></div>
      <div className="glow-circle glow-2"></div>

      <Container className="text-center">
        <motion.h2 
          className="about-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="highlight">Gyaan Satra</span>
        </motion.h2>

        <motion.p 
          className="about-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="tagline">"On The Path Of Truth"</span> – Gyaan Satra represents the confluence of knowledge and action where learning meets implementation.
        </motion.p>

        {/* 🌟 Scrolling Cards Section */}
        <div className="scrolling-cards-wrapper">
          <div className="scrolling-cards">
            {[...cards, ...cards].map((card, index) => (
              <motion.div
                key={index}
                className="about-card p-4 rounded-4 text-center shadow-sm"
                whileHover={{ scale: 1.06 }}
              >
                <div className="icon-box mb-3">{card.icon}</div>
                <h5 className="fw-bold mb-2">{card.title}</h5>
                <p className="text-muted">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🎯 Mission Section */}
        <motion.div 
          className="mission-section mt-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <h2>Our Mission</h2>
          <p>
            To create a comprehensive learning ecosystem where knowledge transforms into expertise,
            where students master forensic science, programming fundamentals, and web development through
            structured curriculum and hands-on practice.
          </p>

          <div className="mission-stats">
            <div className="stat-box">
              <Counter target={500} duration={2000} suffix="+" />
              <span>Students Trained</span>
            </div>
            <div className="stat-box">
              <Counter target={3} duration={1200} />
              <span>Specialized Courses</span>
            </div>
            <div className="stat-box">
              <Counter target={95} duration={1800} suffix="%" />
              <span>Success Rate</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AboutMain;
