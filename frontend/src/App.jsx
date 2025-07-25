import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';



import AppNavbar from './navbar/AppNavbar';
import Homemain from './home/Homemain';
import AboutMain from './about/AboutMain';
import CourseSection from './premiumcourses/CourseSection';
import ForensicCourses from './ForensicCourses';
import DSACourses from './DSACourses';
import FrontendCourses from './FrontendCourses';
import BackendCourses from './BackendCourses';
import MeetOurCEO from './meetourfounder/MeetOurCEO';
import NotesList from './notes/NotesList';
import Team from './team/Team';
import Contact from './contact/Contact';
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import QuizPage from './quiz/QuizPage';
import QuizSelector from "./quiz/QuizSelector";
import SessionSelector from './notes/SessionSelector';
import UploadForm from './notes/UploadForm';
import CommunityPartners from "./communitypartners/CommunityPartners";












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
          <Route path="/notes" element={<SessionSelector />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz" element={<QuizSelector />} />
          <Route path="/premiumcourses" element={<CourseSection />} />
          <Route path="/meetourfounder" element={<MeetOurCEO />} />
          <Route path="/admin/upload" element={<UploadForm />} />
          <Route path="/session/:session" element={<NotesList />} />
          <Route path="/communitypartners" element={<CommunityPartners />} />

          
          
        </Routes>
      
    </>
  );
}

export default App;
