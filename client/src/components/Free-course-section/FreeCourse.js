import React from "react";
import { Container, Row, Col } from "reactstrap";

import courseImg11 from "../../assets/web-development.png";
import courseImg12 from "../../assets/kids-learning.png";
import courseImg13 from "../../assets/seo.png";
import courseImg14 from "../../assets/ui-ux.png";
import FreeCourseCard from "./FreeCourseCard";

import "./free-course.css";

const freeCourseData = [
  {
    id: "01",
    title: "Basic Web Development Course",
    imgUrl: courseImg11,
    students: "Enrollments 5.2",
    rating: "Rating 1.7",
  },
  {
    id: "02",
    title: "Coding for Junior Basic Course",
    imgUrl: courseImg12,
    students: "Enrollments 2.3",
    rating: "Rating 1.3",
  },

  {
    id: "03",
    title: "Search Engine Optimization - Basic",
    imgUrl: courseImg13,
    students: "Enrollments 2.4",
    rating: "Rating 1.1",
  },

  {
    id: "04",
    title: "Basic UI/UX Design - Figma",
    imgUrl: courseImg14,
    students: "Enrollments 4.2",
    rating: "Rating 1.6",
  },
];

const FreeCourse = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Our Free Courses</h2>
          </Col>

          {freeCourseData.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <FreeCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FreeCourse;