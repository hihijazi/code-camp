import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assets/why-choose-us.png";
import "./choose-us.css";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Why Choose Us</h2>
              <p>
                Code camp offers a compelling option for individuals looking to
                delve into web development for several reasons. Firstly, it provides
                a range of both free and affordable courses, making it accessible to
                learners with varying budgets. Additionally, students have the flexibility 
                to choose between live classes with an instructor or self-paced learning, 
                accommodating different preferences and schedules. The structured curriculum
                ensures comprehensive coverage of essential coding concepts and practical skills
                crucial for web development. Moreover, the supportive learning environment
                fosters collaboration and interaction among students, enhancing the overall
                learning experience. Overall, Code camp equips individuals with the tools and 
                knowledge necessary to embark on a successful journey in web development.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=ntNrecYUCfk"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    className="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
