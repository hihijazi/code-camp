// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import ChatBot from './ChatBot';
import ChooseUs from './ChooseUs';
import Courses from './Courses';
import InstructorLogin from './InstructorLogin';
import StudentLogin from './StudentLogin';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import FreeCourses from './FreeCourses';
import InstructorLogout from './InstructorLogout';
import Signup from './Signup';
import StudentLogout from './StudentLogout';
import Testimonials from './Testimonials';
import Transaction from './Transaction';
import TransactionDetails from './TransactionDetails';
import Enrollment from './Enrollment';
import Features from './Features';
import Company from './Company';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/chat-bot" element={<ChatBot />} />
        <Route path="/choose-us" element={<ChooseUs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/free-courses" element={<FreeCourses />} />
        <Route path="/instructor-logout" element={<InstructorLogout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction-details" element={<TransactionDetails />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/features" element={<Features />} />
        <Route path="/company" element={<Company />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;