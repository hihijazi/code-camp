import React, { useState, useEffect, Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./courses.css";

function CoursesForm({ courseId, onAddCourse }) {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set()); 
  const [formErrors, setFormErrors] = useState({}); 
  const navigate = useNavigate();
  const user_data = JSON.parse(localStorage.getItem('user'));
  let accessToken = null;

  if (user_data) {
    accessToken = user_data.access_token;
  }

  useEffect(() => {
    fetch("/api/courses")
      .then(response => response.json())
      .then(setCourses)
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  function handleEnroll(courseId) {
    fetch("/api/student-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ course_id: courseId }),
    })
    .then(response => {
      if (response.ok) {
        toast.success("You have successfully enrolled for this course.");
        navigate('/student-dashboard');
        window.location.reload();
        setEnrolledCourses(prevEnrolledCourses => new Set([...prevEnrolledCourses, courseId])); 
      } else {
        console.error("Failed to enroll student:", response.statusText);
        toast.error(response.statusText);
      }
    })
    .catch(error => console.error("Error enrolling student:", error));
  }

  function isEnrolled(courseId) {
    return enrolledCourses.has(courseId); 
  }

  function handleDelete(courseId) {
    fetch(`/courses/${courseId}`, {  
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then(response => {
      if (response.ok) {
        toast.success("Course deleted successfully.");

        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      } else {
        console.error("Failed to delete course:", response.statusText);
        toast.error(response.statusText);
      }
    })
    .catch(error => console.error("Error deleting course:", error));
  }
  
  
  
  
  return (
    <Fragment>
      <Header />
      <div className='container1'>
        <div className='content'>
          <div className='detail_container'>
            <div className="avbghskdkd">
              <div className="course-container">
                {courses.map(course => (
                  <div className="course-item" key={course.id}>
                    <div className='content'>
                      <div className='img-box'>
                        <img src={course.image} alt={course.name}/> 
                      </div>
                      <div className='detail'>
                        <div className='info'>
                          <h3>{course.name}</h3>
                          <p>{course.description}</p> 
                          <p>{course.price}</p> 
                          {isEnrolled(course.id) ? (
                            <button disabled>Enrolled</button> 
                          ) : (
                            <button onClick={() => handleEnroll(course.id)}>{isEnrolled(course.id) ? 'Enrolled' : 'Enroll'}</button>
                          )}

                          <button onClick={() => handleDelete(course.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
      <Footer />
    </Fragment>
  );
}

export default CoursesForm;