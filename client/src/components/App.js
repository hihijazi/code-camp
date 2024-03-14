// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import TransactionDetail from './TransactionDetail';
import Enrollment from './Enrollment';
import Features from './Features';
import Company from './Company';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/chat-bot">
          <ChatBot />
        </Route>
        <Route path="/choose-us">
          <ChooseUs />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/instructor-login">
          <InstructorLogin />
        </Route>
        <Route path="/student-login">
          <StudentLogin />
        </Route>
        <Route path="/free-courses">
          <FreeCourses />
        </Route>
        <Route path="/instructor-logout">
          <InstructorLogout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/student-logout">
          <StudentLogout />
        </Route>
        <Route path="/testimonials">
          <Testimonials />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/transaction-detail">
          <TransactionDetail />
        </Route>
        <Route path="/enrollment">
          <Enrollment />
        </Route>
        <Route path="/features">
          <Features />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

