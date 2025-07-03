import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';

import AppNavbar from './navbar/AppNavbar';
import Homemain from './home/Homemain';
import AboutMain from './about/AboutMain';
import CourseSection from './premiumcourses/CourseSection';
import MeetOurCEO from './meetourfounder/MeetOurCEO';
import Team from './team/Team';
import Contact from './contact/Contact';




// This component renders all sections for the scroll-based homepage
function ScrollLayout() {
  return (
    <>
      <Element name="home"><Homemain /></Element>
      <Element name="about"><AboutMain /></Element>
      <Element name="courses"><CourseSection /></Element>
      <Element name="ceo"><MeetOurCEO /></Element>
      <Element name="team"><Team /></Element>
      <Element name="contact"><Contact /></Element>
    </>
  );
}

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<ScrollLayout />} />
        <Route path="/meetourceo" element={<MeetOurCEO />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </>
  );
}

export default App;