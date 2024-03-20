import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'
import './index.css';
import CoursesForm from './components/Courses-section/CoursesForm';
import Chatbot from './components/Chat-bot/Chatbot';
import { ChatProvider } from './components/Chat-bot/ChatContext';




import 'bootstrap/dist/css/bootstrap.css';
// import 'remixicon/fonts/remixicon.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/courses" element={<CoursesForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/chat" element={<ChatProvider />} />
      </Routes>
    </Router>
  </React.StrictMode>
);