import React, { useState } from "react";

import "./Team.css";
import CEOImage from "../assets/ceo.jpg";
import cofounder from "../assets/cofounder.jpg";
import Kavya from "../assets/Kavya.jpeg";
import Director from "../assets/director.jpg";
import TechLead from "../assets/Deepak.jpeg";
import Bharat from "../assets/Bharat.jpeg";
import Asmit from "../assets/asmit.jpeg";
import pranav from "../assets/pranav.jpeg";
import Kiran from "../assets/kiran.jpeg";
import Jaspreet from "../assets/jaspreet.jpeg";

function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamData = [
    {
      name: "Miss Mansha Negi",
      role: "FOUNDER & CEO",
      quote:
        "Leading the vision of transforming education through structured learning and innovation.",
      icon: "bi bi-award",
      image: CEOImage,
      bgColor: "bg-yellow",
    },
    {
      name: "Mr Navneet Singh",
      role: "CO-FOUNDER & CTO",
      quote:
        "Building the technical foundation that powers the future of learning.",
      icon: "bi bi-stars",
      image: cofounder,
      bgColor: "bg-orange",
    },
    {
      name: "Miss Shiksha",
      role: "Director",
      quote: "Building the vision that powers tomorrow’s success.",
      icon: "bi bi-award",
      image: Director,
      bgColor: "bg-indigo",
    },
    {
      name: "Mr Kavya Rajput",
      role: "HEAD OF EVENTS & EVENT MANAGER",
      quote:
        "Leading the planning and execution of events that leave a lasting impression.",
      icon: "bi bi-quote",
      image: Kavya,
      bgColor: "bg-pink",
    },
    {
      name: "Mr Deepak Singh",
      role: "Tech Lead",
      quote:
        "Driving technical vision while turning complex ideas into practical solutions.",
      icon: "bi bi-stars",
      image: TechLead,
      bgColor: "bg-blue",
    },

    {
      name: "Mr Asmit Kumar",
      role: "Head of PR and Social Media",
      quote:
        "Building strong brand presence through strategic communication and storytelling.",
      icon: "bi bi-lightbulb",
      image: Asmit,
      bgColor: "bg-green",
    },
    {
      name: "Mr Bharat Sharma",
      role: "Event Manager & Creative Team",
      quote:
        "Combining structured planning with creative ideas to deliver impactful events.",
      icon: "bi bi-shield-lock",
      image: Bharat,
      bgColor: "bg-purple",
    },
    {
      name: "Miss Kiran Bala",
      role: "Coordinator of Events & Social Media",
      quote:
        "Coordinating seamless events while engaging audiences across social platforms.",
      icon: "bi bi-brush",
      image: Kiran,
      bgColor: "bg-indigo",
    },
    {
      name: "Miss Jaspreet Kaur",
      role: "Head of Creative Team & Tech Coordinator",
      quote:
        "Supporting innovation by bridging technology and creative collaboration.",
      icon: "bi bi-brush",
      image: Jaspreet,
      bgColor: "bg-indigo",
    },
    {
      name: "Mr Pranav",
      role: "Coordinator of Creative Team",
      quote:
        "Organizing creative efforts to transform ideas into meaningful experiences.",
      icon: "bi bi-brush",
      image: pranav,
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

      {/* Team Cards */}
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
              onClick={() => setSelectedMember(member)} // open popup
            >
              <div className="vision-icon">
                <i className={member.icon}></i>
              </div>
              <blockquote>“{member.quote}”</blockquote>
              <div className="vision-footer d-flex align-items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="vision-img"
                />
                <div className="vision-text ms-3">
                  <h5>{member.name}</h5>
                  <p>{member.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedMember && (
        <div className="popup-overlay" onClick={() => setSelectedMember(null)}>
          <motion.div
            className="popup-card"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="popup-img"
            />
            <h3>{selectedMember.name}</h3>
            <p className="popup-role">{selectedMember.role}</p>
            <p className="popup-quote">“{selectedMember.quote}”</p>
            <button
              className="popup-close"
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Team;
