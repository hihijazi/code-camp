// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

import CoursesForm from './components/Courses-section/CoursesForm';
import ChatBot from './components/Chat-bot/Chatbot'; 
import InstructorLogin from './components/InstructorLogin';
import StudentLogin from './components/StudentLogin'; 
import Signup from './components/Signup.js';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesForm />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/instructorlogin" element={<InstructorLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App