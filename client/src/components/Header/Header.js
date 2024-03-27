import React, { useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "./header.css";

const Header = () => {
  const { isVisible, toggleVisibility } = true;
  const menuRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const user_data = localStorage.getItem('user');
  const userDataObject = JSON.parse(user_data);
  const navigate = useNavigate(); // Access navigate function

  useEffect(() => {
    const userIsLoggedIn = checkUserLoginStatus();
    setIsLoggedIn(userIsLoggedIn);
    if (userDataObject) {
      const is_student = userDataObject.is_student;
      setIsStudent(is_student);
    }
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirect to home page
    window.location.reload(); // Reload the app
  };

  const navLinks = [
    {
      display: "Home",
      url: "/",
    },
    {
      display: "About Us",
      url: "/",
      scrollTo: "aboutUsSection",
    },
    {
      display: "Courses",
      url: "/courses",
    },
    {
      display: "Chat",
      url: "/chat-bot",
    },
    {
      display: "Student Login",
      url: "/studentlogin",
      login: true,
    },
    {
      display: "Instructor Login",
      url: "/instructorlogin",
      login: true,
    },
    {
      display: "Dashboard",
      url: "/student-dashboard",
      is_dash: true,
    },
    {
      display: "Instructor Dashboard",
      url: "/instructor-dashboard",
      is_dash: true,
    },
    {
      display: "Logout",
      logout: true,
      onClick: handleLogout,
    },
  ];

  const filteredLinks = navLinks.filter(item => {
    if (isLoggedIn && item.logout) {
      return true;
    }
    if (!isLoggedIn && (item.display === "Student Login" || item.display === "Instructor Login")) {
      return true;
    }
    if (isLoggedIn && item.display === "Dashboard" && isStudent) {
      return true;
    }
    if (isLoggedIn && item.display === "Instructor Dashboard" && !isStudent) {
      return true;
    }
    return !item.login && !item.logout && !item.is_dash;
  });

  const handleClick = (event, onClick) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className="d-flex align-items-center gap-1" style={{ fontSize: '45px', display: 'flex', alignItems: 'center' }} >
              <i className="ri-pantone-line"></i> 
              <span style={{ fontWeight: 'bold', color: 'Teal' }}>Code Camp</span>
              <ul className="nav__list" style={{ display: 'flex', gap: '20px', listStyle: 'none', marginLeft: '20px' }}>
                {filteredLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    {item.logout ? (
                      <a href="#" onClick={(event) => handleClick(event, item.onClick)}>{item.display}</a>
                    ) : (
                      <a href={item.url}>{item.display}</a>
                    )}
                  </li>
                ))}
              </ul>
            </h2>
          </div>

          <div className="nav__right">
            <p className="mb-0 d-flex align-items-center gap-2">
            </p>
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

const checkUserLoginStatus = () => {
  const user_data = localStorage.getItem('user');
  if (user_data) {
    return true;
  } else {
    return false;
  }
};

export default Header;