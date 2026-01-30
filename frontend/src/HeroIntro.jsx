import React, { useEffect } from "react";
import Lottie from "lottie-react";
import onlineLearning from "./assets/onlineLearning.json";
import Educatin from "./assets/Educatin.json";
import { FaChevronDown } from "react-icons/fa";
import "./HeroIntro.css";

function HeroIntro({ onEnter }) {
  // Disable scroll when intro is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // reset on unmount
    };
  }, []);

  const handleEnter = () => {
    document.body.style.overflow = "auto"; // allow scroll
    if (onEnter) onEnter();
  };

  return (
    <div className="hero-intro-wrapper">
      {/* Left Animation */}
      <div className="hero-animation-left">
        <Lottie animationData={onlineLearning} loop={true} />
      </div>

      {/* Center Heading */}
      <div className="hero-heading-section">
        <h3 className="hero-heading">
          Welcome to <span className="neon-text">EviSphere Tech</span>
        </h3>
        <p className="hero-subtitle">"On The Path of Truth"</p>

        {/* Down Arrow */}
        <button className="down-arrow" onClick={handleEnter}>
          <FaChevronDown size={32} className="neon-arrow" />
        </button>
      </div>

      {/* Right Animation */}
      <div className="hero-animation-right">
        <Lottie animationData={Educatin} loop={true} />
      </div>
    </div>
  );
}

export default HeroIntro;
