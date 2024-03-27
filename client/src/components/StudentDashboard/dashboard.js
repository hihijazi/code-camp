import React, { useState, useEffect,  Fragment } from 'react';
import './dashboard.css'; // Import CSS file
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


const StudentDashboard = ({ loggedInUser }) => {
  const [userDetails, setUserDetails] = useState(loggedInUser);
  const [coursesDetails, setCoursesDetails] = useState([
    { 'course name': "Python", "course details": "jdjdddndnddnddnd" },
    { "course name": "React", "course details": "ndndndnndnnddnd" }
  ]);

  const user_data = JSON.parse(localStorage.getItem('user'));
  let accessToken = null;

  if (user_data) {
    accessToken = user_data.access_token;
  }
  
  useEffect(() => {
    fetchCourses();
  }, []); 

  function fetchCourses() {
    fetch("/api/student-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(response.json(), "dddddkdkkdkdkd");
        return response.json();
      } else {
        console.error("Failed to enroll student:", response.statusText);
      }
    })
    .catch(error => console.error("Error enrolling student:", error));
  }


  const coursesOpted = userDetails ? userDetails.courses : [];

  const handleUpdateDetails = () => {
    // For simplicity, let's just update the name of the user
    const newName = prompt("Enter new name:");
    if (newName) {
      setUserDetails({ ...userDetails, name: newName });
    }
  };

  return (
    <Fragment>
      <Header />
      <div>
      <h2>User Details</h2>
      <div className="user-profile">
        <img src="https://images.pond5.com/male-avatar-profile-picture-icon-illustration-100492206_iconl.jpeg" alt="User Profile" className="profile-image" />
        <div className="user-details">
          <h3>Test user</h3>
          <p><strong>User ID:</strong> 12</p>
          <button onClick={handleUpdateDetails}>Update Details</button>
        </div>
      </div>

      <h3>Courses Opted</h3>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Details</th>
          </tr>
        </thead>
        <tbody>
          {coursesDetails.map((course, index) => (
            <tr key={index}>
              <td>{course['course name']}</td>
              <td>{course['course details']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <Footer />
    </Fragment>
  );
};

export default StudentDashboard;