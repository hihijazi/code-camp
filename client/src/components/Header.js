import React, { useRef } from "react";
import { Container } from "reactstrap";

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
            <h2 className="d-flex align-items-center gap-1" style={{ fontSize: '75px' }} >
              <i className="ri-pantone-line"></i> 
              <span style={{ fontWeight: 'bold', color: 'Plum' }}>Code Camp</span>
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-phone-line"></i> 1-800-888-CODE.
              </p>
            </div>
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

