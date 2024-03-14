
import React from "react";
import { Container, Row, Col } from "reactstrap";


const Courses = () => {

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div >
              <div >
                <h2>Available Courses</h2>
                <p>
                  You can view all of our available courses. 
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;