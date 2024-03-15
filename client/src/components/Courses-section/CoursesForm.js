import React, { useState, useEffect } from "react";
import "./courses.css";

function CoursesForm({ courseId, onAddCourse }) {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState(null);
  const [formErrors, setFormErrors] = useState({}); 

  useEffect(() => {
    fetch("/courses")
      .then(response => response.json())
      .then(setCourses);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      course_id: courseId,
      course_name: courseName,
      price,
    }
    fetch("/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newCourse) => {
          onAddCourse(newCourse);
          setFormErrors({});
        });
      } else {
        response.json().then((error) => setFormErrors(error.errors));
      }
    });
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='detail_container'>
          {detail ? (
            <div className='detail_content'>
              <div key={detail.id}>
                <h2>{detail.Title}</h2> 
                <h3>{detail.Description}</h3> 
                <p>{detail.price}</p> 
                <button>Enroll</button>
              </div>
            </div>
          ) : (
            <div className='box'>
              {courses.map(course => (
                <div key={course.id} className='content'>
                  <div className='img-box'>
                    <img src={course.image} alt={course.Title} />
                  </div>
                  <div className='detail'>
                    <div className='info'>
                      <h3>{course.Title}</h3> 
                      <p>{course.Description}</p> 
                      <p>{course.price}</p> 
                    </div>
                    <button onClick={() => setDetail(course)}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesForm;


