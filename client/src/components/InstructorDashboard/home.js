import React, { Fragment, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const InstructorDashboard = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);

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
        <div className="user-profile">
          <img src="https://images.pond5.com/male-avatar-profile-picture-icon-illustration-100492206_iconl.jpeg" alt="User Profile" className="profile-image" />
          <div className="user-details">
            <h3>Test user</h3>
            <p><strong>User ID:</strong> 12</p>
            <button onClick={handleUpdateDetails}>Update Details</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Courses</th>
              <th>Students</th>
              <th>Mark Present</th>
              <th>Mark Absent</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instructor => (
              <tr>
                <td>
                  <ul>
                    {courses.filter(course => course.instructor_id === instructor.id).map(course => (
                      <li key={course.id}>{course.name}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {courses.filter(course => course.instructor_id === instructor.id).flatMap(course =>
                      students.filter(student => student.course_id === course.id).map(student => (
                        <li key={student.id}>{student.name}</li>
                      ))
                    )}
                  </ul>
                </td>
                <td>
                  <ul>
                    {students.map(student => (
                      <li key={student.id}>
                        <button onClick={() => handleMarkPresent(student.id)} disabled={presentStudents.includes(student.id)}>
                          {student.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {students.map(student => (
                      <li key={student.id}>
                        <button onClick={() => handleMarkAbsent(student.id)} disabled={absentStudents.includes(student.id)}>
                          {student.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </Fragment>
  );
};

export default InstructorDashboard;