// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CoursesForm from './components/Courses-section/CoursesForm';
import ChatBot from './components/Chat-bot/Chatbot'; 
import InstructorLogin from './components/InstructorDashboard/InstructorLogin';
import StudentLogin from './components/StudentDashboard/StudentLogin'; 
import InstructortLogin from './components/InstructorDashboard/InstructorSignup'; 
import StudentSignup from './components/StudentDashboard/StudentSignup.js';
import InstructorDashboard from './components/InstructorDashboard/home';
import { ChatProvider } from "./components/Chat-bot/ChatContext";
import StudentDashboard from './components/StudentDashboard/dashboard';


// App.js
const App = () => {
  return (
      <ChatProvider>
        <div className="flex flex-col h-screen justify-between">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesForm />} />
            <Route path="/chat-bot" element={<ChatBot />} />   
            <Route path="/instructorlogin" element={<InstructorLogin />} />
            <Route path="/studentlogin" element={<StudentLogin />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/instructor-signup" element={<InstructortLogin />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          </Routes>
        </Router>
        </div>
      </ChatProvider>
  );
}

export default App