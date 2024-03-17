import React from "react";
import "./testimonial.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import imgKelly from "../../assets/testimonial02.png";
import imgOmar from "../../assets/testimonial03.png";
import imgSami from "../../assets/testimonial04.png";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="testimonial__wrapper">
              <Slider {...settings}>
                <div>
                  <div className="testimonial__content d-flex align-items-center">
                    <div className="testimonial__img">
                      <img src={imgKelly} alt="" className="w-100" />
                    </div>
                    <div className="testimonial__text">
                      <h6 className="mb-3 fw-bold">
                        Can't believe how much I've learned
                      </h6>
                      <p>
                        Code Camp is truly a great place to begin learning
                        Web Development. I have learned so much and I only
                        have been learning here for three months.
                      </p>
                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Kelly Davis</h6>
                        <p>California, United States</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="testimonial__content d-flex align-items-center">
                    <div className="testimonial__img">
                      <img src={imgOmar} alt="" className="w-100" />
                    </div>
                    <div className="testimonial__text">
                      <h6 className="mb-3 fw-bold">
                        Excellent courses and great instructors
                      </h6>
                      <p>
                        The courses are very easy to follow and the
                        instructors are very helpful. I would highly
                        recommend Code Camp to beginners wanting to break
                        into tech.
                      </p>
                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Omar Ali</h6>
                        <p>Arizona, United States</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="testimonial__content d-flex align-items-center">
                    <div className="testimonial__img">
                      <img src={imgSami} alt="" className="w-100" />
                    </div>
                    <div className="testimonial__text">
                      <h6 className="mb-3 fw-bold">
                        Easy to follow courses
                      </h6>
                      <p>
                        Trying to break into tech isn't easy. With these
                        amazing courses, they make it easier. The
                        instructors are very helpful and the course
                        material is efficient.
                      </p>
                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Sami Qaisi</h6>
                        <p>Chicago, United States</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;


