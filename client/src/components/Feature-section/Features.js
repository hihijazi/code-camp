import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "At Code Camp, we prioritize quick learning with our concise and focused coding courses. Our short courses are designed to efficiently impart essential coding skills, allowing students to progress rapidly in their journey towards mastering web development.",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Code Camp ensures 24/7 support for its students, guaranteeing assistance whenever they encounter challenges or have questions. Our dedicated support team is readily available to provide guidance and address any inquiries, ensuring learners receive continuous help throughout their coding journey!",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "Upon completing any courses at Code Camp, students receive certifications detailing the course completed along with the total number of hours dedicated to learning. These certifications serve as valuable credentials, validating the skills and knowledge acquired, and enhancing the professional credibility of our graduates.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i className={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
