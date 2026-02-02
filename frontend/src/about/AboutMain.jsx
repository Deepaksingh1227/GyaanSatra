import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import {
  FaMicroscope,
  FaCodeBranch,
  FaLaptopCode,
  FaAward,
} from "react-icons/fa";
import { AnimatePresence, useInView } from "framer-motion";
import "./AboutMain.css";

function Counter({ target, duration, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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
      {count.toLocaleString()}
      {suffix}
    </h3>
  );
}

export default function AboutMain() {
  const cards = [
    {
      icon: <FaMicroscope size={28} />,
      title: "Forensic Excellence",
      desc: "Advanced forensic science education with modern analysis methods and techniques.",
    },
    {
      icon: <FaCodeBranch size={28} />,
      title: "DSA Mastery",
      desc: "Comprehensive DSA training for competitive programming and coding excellence.",
    },
    {
      icon: <FaLaptopCode size={28} />,
      title: "Web Development",
      desc: "Full-stack web development including frontend, backend, and deployment.",
    },
    {
      icon: <FaAward size={28} />,
      title: "Proven Results",
      desc: "Track record of excellence among students in various specialized fields.",
    },
  ];

  // --- Slider state ---
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + cards.length) % cards.length);
  };

  const goTo = (i) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex((i + cards.length) % cards.length);
  };

  // Auto-slide
  useEffect(() => {
    const id = setInterval(() => paginate(1), 3000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line

  // Drag/swipe helpers
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? 320 : -320,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.45, ease: "easeIn" },
    }),
  };

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
          About <span className="highlight">EviSphere Tech</span>
        </motion.h2>

        <motion.p
          className="about-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="tagline">"On The Path Of Truth"</span> – EviSphere
          Tech represents the confluence of knowledge and action where learning
          meets implementation.
        </motion.p>

        {/* 🌟 Horizontal one-by-one slider (keeps your card style) */}
        <div className="cards-slider-viewport">
          <button
            className="slider-btn prev"
            aria-label="Previous"
            onClick={() => paginate(-1)}
          >
            ‹
          </button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              className="about-card p-4 rounded-4 text-center shadow-sm slide"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
            >
              <div className="icon-box mb-3">{cards[index].icon}</div>
              <h5 className="fw-bold mb-2">{cards[index].title}</h5>
              <p className="text-muted">{cards[index].desc}</p>
            </motion.div>
          </AnimatePresence>

          <button
            className="slider-btn next"
            aria-label="Next"
            onClick={() => paginate(1)}
          >
            ›
          </button>

          <div className="slider-dots">
            {cards.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                aria-label={`Go to ${cards[i].title}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* 🎯 Mission Section (unchanged) */}
        <motion.div
          className="mission-section mt-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <h2>Our Mission</h2>
          <p>
            To create a comprehensive learning ecosystem where knowledge
            transforms into expertise, where students master forensic science,
            programming fundamentals, and web development through structured
            curriculum and hands-on practice.
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
