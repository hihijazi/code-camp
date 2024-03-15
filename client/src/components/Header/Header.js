import React, { useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About Us",
    url: "/about-us",
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
    display: "Instructor Login",
    url: "#",
  },
  {
    display: "Student Login",
    url: "#",
  },
];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className="d-flex align-items-center gap-1" style={{ fontSize: '25px', display: 'flex', alignItems: 'center' }} >
              <i className="ri-pantone-line"></i> 
              <span style={{ fontWeight: 'bold', color: 'Plum' }}>Code Camp</span>
              <ul className="nav__list" style={{ display: 'flex', gap: '20px', listStyle: 'none', marginLeft: '20px' }}>
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
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

export default Header;


