import React, { useState, useEffect, Fragment } from 'react';
import './dashboard.css'; // Import CSS file
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { FaPencilAlt } from 'react-icons/fa'; // Import pencil icon from react-icons

const StudentDashboard = ({ loggedInUser }) => {
  const [userDetails, setUserDetails] = useState(loggedInUser);
  const [coursesDetails, setCoursesDetails] = useState([]);

  const user_data = JSON.parse(localStorage.getItem('user'));
  let accessToken = null;

  if (user_data) {
    accessToken = user_data.access_token;
  }
  
  useEffect(() => {
    fetchCourses();
    fetchUserDetail();
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
        return response.json(); // Return the parsed JSON
      } else {
        console.error("Failed to fetch courses:", response.statusText);
        throw new Error("Failed to fetch courses");
      }
    })
    .then(data => {
      setCoursesDetails(data); // Set coursesDetails state with the fetched data
    })
    .catch(error => console.error("Error fetching courses:", error));
  }

  function fetchUserDetail() {
    let userId = null;
    if (user_data) {
      userId = user_data.id;
    }
    fetch(`/students/${userId}`, {
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
      setUserDetails(data); // Set userDetails state with the fetched data
    })
    .catch(error => console.error("Error fetching user:", error));
  }

  function updateUserDetail(updatedUserDetails) {
    let userId = null;
    if (user_data) {
      userId = user_data.id;
    }
    fetch(`/students/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(updatedUserDetails)
    })
    .then(response => {
      if (response.ok) {
        console.log("User details updated successfully");
        // You may want to update the local state with the updated details here
      } else {
        console.error("Failed to update user details:", response.statusText);
        throw new Error("Failed to update user details");
      }
    })
    .catch(error => console.error("Error updating user details:", error));
  }

  const handleUpdateDetails = () => {
    // For simplicity, let's just update the name of the user
    const newName = prompt("Enter new name:");
    if (newName) {
      const updatedUserDetails = { ...userDetails, name: newName };
      updateUserDetail(updatedUserDetails);
      // Update local state with the updated user details
      setUserDetails(updatedUserDetails);
    }
  };
  
  
  

  return (
    <Fragment>
      <Header />
      <div className="dashboard-container">
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
        <div className="courses-container">
          <h3>Courses Opted</h3>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Price</th>
                <th>Instructor Name</th>
                <th>Course Image</th>
                <th>Course Details</th>
              </tr>
            </thead>
            <tbody>
              {coursesDetails && coursesDetails.map((course, index) => (
                <tr key={index}>
                  <td>{course['name']}</td>
                  <td>{course['price']}</td>
                  <td>Test Instructor</td>
                  <td>
                    <div className='img-box'>
                      <img src={course.image} alt={course.name}/> 
                    </div>
                  </td>
                  <td>{course['description']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default StudentDashboard;