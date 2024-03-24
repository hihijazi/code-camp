// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

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