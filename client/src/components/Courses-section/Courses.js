
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "./courses.css";



const Courses = () => {
 const [courses, setCourses] = useState([]);

 useEffect(() => {
    fetch('http://127.0.0.1:5555/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
 }, []);

 return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div>
              <div>
                <h2>Available Courses</h2>
                <p>
                 You can view all of our available courses. 
                </p>
              </div>
              {courses.map(course => (
                <div key={course.id}>
                 <h3>{course.name}</h3>
                 <p>{course.description}</p>
                 <p>Price: {course.price}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
 );
};

export default Courses;