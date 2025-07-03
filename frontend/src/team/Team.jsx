import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';
import CEOImage from '../assets/ceo.jpg';
import cofounder from '../assets/cofounder.jpg';
import utkarsh from '../assets/utkarsh.jpg';
import shraddha from '../assets/shraddha.jpg';
import advisor from '../assets/advisor.jpg'; 
import chief from '../assets/chief.jpg'; 
import member from '../assets/member.png';
import tech from '../assets/tech.png';


function Team ()  {
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
      bgColor: "bg-green",  // ✅ New
    },
    
    {
      name: "Kavya Rajput, Deepak Singh, Bharat Sharma & Asmit Kumar",
      role: "THE TECH CONQUERERS",
      quote: "From Firewalls to Final Slides – They've Got It Locked.",
      icon: "bi bi-shield-lock",
      image: tech,
      bgColor: "bg-purple",
    },
     
     {
      name: "Shraddha Sahni",
      role: "COORDINATION HEAD",
      quote: "Behind every successful event is a caffeinated coordinator.",
      icon: "bi bi-stars",
      image: shraddha,
      bgColor: "bg-blue",
    },
    {
      name: "Amteshwar",
      role: "COORDINATION CHIEF",
      quote: "Orchestrating collaboration and ensuring smooth operations.",
      icon: "bi bi-people-fill",
      image: chief,
      bgColor: "bg-red",  
    },
    {
      name: "Aman Singh,Kartik",
      role: "GRAPHIC & EDITING TEAM",
      quote: "Crafting visuals and edits that bring stories to life with creativity and precision.",
      icon: "bi bi-brush",
      image: member,
      bgColor: "bg-indigo", // Already unique
    },
  ];

  return (
    <section className="container py-5 visionary-section">
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

      <div className="row g-4">
        {teamData.map((member, index) => (
          <motion.div
            key={index}
            className="col-md-6 col-lg-6"
            whileHover={{ scale: 1.03, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className={`vision-card ${member.bgColor}`}>
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
