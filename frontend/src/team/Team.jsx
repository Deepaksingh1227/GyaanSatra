import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';
import CEOImage from '../assets/ceo.jpg';
import cofounder from '../assets/cofounder.jpg';
import utkarsh from '../assets/utkarsh.jpg';
import manager from '../assets/manager.jpg';
import advisor from '../assets/advisor.jpg'; 
import graphicalteam from '../assets/graphicalteam.jpg';
import gr from '../assets/gr.jpg';

function Team() {
  const teamData = [
    {
      name: "Mansha Negi",
      role: "FOUNDER & CEO",
      quote: "Leading the vision of transforming education through structured learning and innovation.",
      icon: "bi bi-award",
      image: CEOImage,
      bgColor: "bg-yellow",
    },
    {
      name: "Navneet Singh",
      role: "CO-FOUNDER & CTO",
      quote: "Building the technical foundation that powers the future of learning.",
      icon: "bi bi-stars",
      image: cofounder,
      bgColor: "bg-orange",
    },
    {
      name: "Sonali Gupta",
      role: "Managerial Director",
      quote: "Orchestrating operations with precision, turning plans into performance.",
      icon: "bi bi-stars",
      image: manager,
      bgColor: "bg-blue",
    },
    {
      name: "Utkarsh Singh",
      role: "The ADMINISTRATIVE ANCHOR",
      quote: "Where Structure Meets Strategy.",
      icon: "bi bi-quote",
      image: utkarsh,
      bgColor: "bg-pink",
    },
    {
      name: "Aman Dehran",
      role: "ADVISOR",
      quote: "Guiding the strategic vision with experience and wisdom.",
      icon: "bi bi-lightbulb",
      image: advisor,
      bgColor: "bg-green",
    },
    {
      name: "Kavya Rajput, Deepak Singh, Bharat Sharma & Asmit Kumar",
      role: "THE TECH CONQUERERS",
      quote: "From Firewalls to Final Slides – They've Got It Locked.",
      icon: "bi bi-shield-lock",
      image: gr,
      bgColor: "bg-purple",
    },
    {
      name: "Aman Singh, Kartik, Disha",
      role: "GRAPHIC & EDITING TEAM",
      quote: "Crafting visuals and edits that bring stories to life with creativity and precision.",
      icon: "bi bi-brush",
      image: graphicalteam,
      bgColor: "bg-indigo",
    },
  ];

  return (
    <section className="container-fluid py-5 visionary-section">
      <div className="text-center mb-5">
        <motion.h2
          className="visionary-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Visionary Team
        </motion.h2>
        <p className="visionary-subtitle">
          The brilliant minds behind Gyaan Satra's transformative journey
        </p>
      </div>

      <div className="team-scroll-container px-3">
        {teamData.map((member, index) => (
          <motion.div
            key={index}
            className="team-card-wrapper"
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.04, rotate: 0.3 }}
              className={`vision-card ${member.bgColor}`}
            >
              <div className="vision-icon">
                <i className={member.icon}></i>
              </div>
              <blockquote>“{member.quote}”</blockquote>
              <div className="vision-footer d-flex align-items-center">
                <img src={member.image} alt={member.name} className="vision-img" />
                <div className="vision-text ms-3">
                  <h5>{member.name}</h5>
                  <p>{member.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Team;
