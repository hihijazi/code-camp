import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";

import AboutUs from "../components/About-us/AboutUs";
import Courses from "../components/Courses-section/CoursesForm";
import ChooseUs from "../components/Choose-us/ChooseUs";

import Features from "../components/Feature-section/Features";
import FreeCourse from "../components/Free-course-section/FreeCourse";


import Testimonials from "../components/Testimonial/Testimonials";

import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <AboutUs />
      <Courses />
      <ChooseUs />
      <Features />
      <FreeCourse />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};

export default Home;

