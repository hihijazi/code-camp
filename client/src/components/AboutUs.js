import React from "react";
import aboutImg from "../assets/about-us.png";
import CountUp from "react-countup";
//import "../index.css";

const AboutUs = () => {
  return (
    <section className="about">
      <div className="about__content">
        <h2 style={{ fontSize: '75px' }} >About Us</h2>
        <p>
          Code Camp is a virtual coding institute dedicated to empowering students
          and individuals to transition careers by offering affordable courses in various
          programming languages. Through flexible online learning environments, it equips
          learners with the skills and knowledge needed to succeed in the tech industry,
          fostering career advancement opportunities!
          
        </p>

        <div className="about__counter">
          <div className="counter-item">
            <span className="counter">
              <CountUp start={0} end={25} duration={2} suffix="K" />
            </span>
            <p className="counter__title">Completed Projects</p>
          </div>

          <div className="counter-item">
            <span className="counter">
              <CountUp start={0} end={12} duration={2} suffix="M" />
            </span>
            <p className="counter__title">Patient Around World</p>
          </div>

          <div className="counter-item">
            <span className="counter">
              <CountUp start={0} end={95} duration={2} suffix="M" />
            </span>
            <p className="counter__title">Ideas Raised Funds</p>
          </div>

          <div className="counter-item">
            <span className="counter">
              <CountUp start={0} end={5} duration={2} suffix="K" />
            </span>
            <p className="counter__title">Categories Served</p>
          </div>
        </div>
      </div>

      <div className="about__img">
        <img src={aboutImg} alt="About Us" className="about__img--image" />
      </div>
    </section>
  );
};

export default AboutUs;