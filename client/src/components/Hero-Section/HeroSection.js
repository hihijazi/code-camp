import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/hero-img.png";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> own pace
              </h2>
              <p className="mb-5">
                With our short and easy to follow courses, <br /> you can easily
                learn on your own to break into tech  <br /> and achieve your 
                goals and desires!
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
