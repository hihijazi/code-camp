import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FaPencilAlt } from "react-icons/fa";
import './dashboard.css';


const InstructorDashboard = ({loggedInUser}) => {
  const [userDetails, setUserDetails] = useState(loggedInUser);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [coursesDetails, setCoursesDetails] = useState([]);
  const user_data = JSON.parse(localStorage.getItem('user'));
  let accessToken = null;

  if (user_data) {
    accessToken = user_data.access_token;
  }

  const instructors = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  const courses = [
    { id: 1, name: 'Introduction to Python', instructor_id: 1 },
    { id: 2, name: 'Web Development', instructor_id: 2 }
  ];

  const students = [
    { id: 1, name: 'Alice', course_id: 1 },
    { id: 2, name: 'Bob', course_id: 2 },
    { id: 3, name: 'Charlie', course_id: 1 }
  ];

  useEffect(() => {
    fetchCourses();
    fetchUserDetail();
  }, []); 

  function fetchCourses() {
    fetch("/api/assign-instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Return the parsed JSON
      } else {
        console.error("Failed to fetch courses:", response.statusText);
        throw new Error("Failed to fetch courses");
      }
    })
    .then(data => {
      console.log("datakdkdd", data)
      setCoursesDetails(data.data); // Set coursesDetails state with the fetched data
    })
    .catch(error => console.error("Error fetching courses:", error));
  }

  function fetchUserDetail() {
    let userId = null;
    if (user_data) {
      userId = user_data.id;
    }
    fetch(`/instructors/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Return the parsed JSON
      } else {
        console.error("Failed to fetch user:", response.statusText);
        throw new Error("Failed to fetch user");
      }
    })
    .then(data => {
      setUserDetails(data);
    })
    .catch(error => console.error("Error fetching user:", error));
  }

  console.log(coursesDetails);

  const handleMarkPresent = (studentId) => {
    setPresentStudents([...presentStudents, studentId]);
    setAbsentStudents(absentStudents.filter(id => id !== studentId));
  };

  const handleMarkAbsent = (studentId) => {
    setAbsentStudents([...absentStudents, studentId]);
    setPresentStudents(presentStudents.filter(id => id !== studentId));
  };

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
      <div className="App">
        <div className="user-details-container">
          <div className="user-profile">
            <img src="https://images.pond5.com/male-avatar-profile-picture-icon-illustration-100492206_iconl.jpeg" alt="User Profile" className="profile-image" />
            <div className="user-details">
              <h3>{userDetails ? userDetails.name : "Test user"}</h3>
              <p><strong>User Name:</strong> {userDetails ? userDetails.username : "12"}</p>
              <button className="update-details-btn" onClick={handleUpdateDetails}><FaPencilAlt /></button>
            </div>
          </div>
        </div>
        {coursesDetails && coursesDetails.map((course, courseIndex) => (
        <div key={courseIndex}>
          <h2>Course Name: {course.name}</h2>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Student Name</th>
                <th>Student Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {course.enrollments.map((enrollment, enrollmentIndex) => (
            enrollment.map((studentData, studentIndex) => (
              <tr key={`${enrollmentIndex}-${studentIndex}`}>
                <td>{studentIndex + 1}</td> {/* Serial number */}
                <td>{studentData[1]}</td> {/* Student name */}
                <td>{studentData[2]}</td> {/* Course name */}
                <td>
                  <button className="mark-button" onClick={() => handleMarkPresent(studentData[0])}>Mark Present</button>
                  <button className="mark-button" onClick={() => handleMarkAbsent(studentData[0])}>Mark Absent</button>
                </td>
              </tr>
            ))
          ))}

            </tbody>
          </table>
          <br/>
        </div>
      ))}
      </div>
      <br/>
      <Footer />
    </Fragment>
  );
};

export default InstructorDashboard;