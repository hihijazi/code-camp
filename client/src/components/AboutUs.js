import React from "react";
import aboutImg from "../assets/about-us.png";
import CountUp from "react-countup";
import "../index.css";

const AboutUs = () => {
  return (
    <section className="about">
      <div className="about__content">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          cupiditate animi deserunt libero nesciunt corporis explicabo nobis
          ex quo molestiae!
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