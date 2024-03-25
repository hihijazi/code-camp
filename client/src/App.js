// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/Home";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

import CoursesForm from './components/Courses-section/CoursesForm';
import ChatBot from './components/Chat-bot/Chatbot'; 
import InstructorLogin from './components/InstructorLogin';
import StudentLogin from './components/StudentLogin'; 
import InstructortLogin from './components/InstructorSignup'; 
import StudentSignup from './components/StudentSignup.js';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesForm />} />
        <Route path="/chat-bot" element={<ChatBot />} />   
        <Route path="/instructorlogin" element={<InstructorLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/instructor-signup" element={<InstructortLogin />} />
      </Routes>
    </Router>
  );
}

export default App