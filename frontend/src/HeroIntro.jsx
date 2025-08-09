import React from "react";
import Lottie from "lottie-react";
import onlineLearning from "./assets/onlineLearning.json";    // Replace with actual file
import Educatin from "./assets/Educatin.json"; // Replace with actual file
import { FaChevronDown } from "react-icons/fa";
import "./HeroIntro.css";

function HeroIntro({ onEnter }) {
  return (
    <div className="hero-intro-wrapper">
      {/* Left Animation */}
      <div className="hero-animation-left">
        <Lottie animationData={onlineLearning} loop={true} />
      </div>

      {/* Center Heading */}
      <div className="hero-heading-section">
        <h1 className="hero-heading">Welcome to <span>Gyaan Satra</span></h1>
        <p className="hero-subtitle">"On The Path of Truth"</p>

        {/* Down Arrow */}
        <button className="down-arrow" onClick={onEnter}>
          <FaChevronDown size={32} />
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
