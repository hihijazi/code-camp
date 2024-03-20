import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";

import AboutUs from "../components/About-us/AboutUs";
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
      <ChooseUs />
      <Features />
      <FreeCourse />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};

export default Home;
