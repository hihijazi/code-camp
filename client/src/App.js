// App.js
<<<<<<< HEAD
=======

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

>>>>>>> cb7f481b39ffb164901022570b96a0994423cc7b
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CoursesForm from './components/Courses-section/CoursesForm';
import ChatBot from './components/Chat-bot/Chatbot'; 
import InstructorLogin from './components/InstructorDashboard/InstructorLogin';
import StudentLogin from './components/StudentDashboard/StudentLogin'; 
import InstructortLogin from './components/InstructorDashboard/InstructorSignup'; 
import StudentSignup from './components/StudentDashboard/StudentSignup.js';
import StudentDashboard from './components/StudentDashboard/home';
import InstructorDashboard from './components/InstructorDashboard/home';
import { ChatProvider } from "./components/Chat-bot/ChatContext";


<<<<<<< HEAD
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
=======

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
>>>>>>> cb7f481b39ffb164901022570b96a0994423cc7b
  );
}


export default App

//export default App;

// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/Home";

// import CoursesForm from './components/Courses-section/CoursesForm';
// import ChatBot from './components/Chat-bot/Chatbot'; 
// import InstructorLogin from './components/InstructorLogin';
// import StudentLogin from './components/StudentLogin'; 
// import Signup from './components/Signup.js';



// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         </Routes>
//       <Routes>
//         <Route path="/courses" element={<CoursesForm />} />
//       </Routes>
//       <Routes>
//         <Route path="/chatbot" element={<ChatBot />} />   
//       </Routes>
//       <Routes>
//         <Route path="/instructorlogin" element={<InstructorLogin />} />
//       </Routes>
//       <Routes>
//         <Route path="/studentlogin" element={<StudentLogin />} />
//       </Routes>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App
