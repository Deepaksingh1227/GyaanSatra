import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



import './CEO.css';
import CEOImage from '../assets/ceo.jpg'; 

function MeetOurCEO  ()  {
  const navigate = useNavigate(); 
  return (
    <section className="container-fluid py-5 ceo-section">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="ceo-title">Meet Our Founder</h2>
          <p className="ceo-subtitle bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
  Leading the path of truth through innovative education
</p>
        </motion.div>

        <div className="row align-items-center">
          <motion.div
            className="col-md-5 mb-4"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={CEOImage} alt="CEO" className="img-fluid ceo-image" />
          </motion.div>

          <motion.div
            className="col-md-7"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="ceo-card p-4 shadow-sm">
              <h3 className="ceo-name">Miss Mansha Negi</h3>
              <p className="ceo-role">Founder & Chief Educator</p>
              <p className="ceo-description">
                With a passion for transforming education through innovative teaching methods, Mansha Negi founded <strong>Gyaan Satra</strong> to bridge the gap between traditional learning and modern educational needs. Her expertise spans across Forensic Science, Data Structures & Algorithms, and Web Development.
              </p>

              <div className="row mt-4">
                {[
                  {
                    icon: 'bi-award-fill',
                    title: 'Expert Educator',
                    desc: 'Years of teaching experience',
                  },
                  {
                    icon: 'bi-journal-bookmark-fill',
                    title: 'Multi-Disciplinary',
                    desc: 'Forensics, DSA & Web Dev',
                  },
                  {
                    icon: 'bi-people-fill',
                    title: 'Student-Focused',
                    desc: 'Personalized learning approach',
                  },
                  {
                    icon: 'bi-lightbulb-fill',
                    title: 'Innovation',
                    desc: 'Modern teaching methods',
                  },
                ].map((item, i) => (
                  <div key={i} className="col-6 col-md-6 col-lg-6 mb-3">
                    <div className="ceo-feature h-100">
                      <i className={`bi ${item.icon}`}></i>
                      <h6>{item.title}</h6>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <motion.button
                  className="connect-btn"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => navigate('/contact')} // Navigate to contact route
                >
                  Connect with Mansha →
                </motion.button>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurCEO;
