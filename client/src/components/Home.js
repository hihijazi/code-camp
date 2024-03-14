import React from 'react';
import home from "../assets/home.png";

const Home = () => {
  return (
    <div style={{ padding: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h2 style={{ fontSize: '75px' }}>Welcome to Code Camp</h2>
        <p style={{ fontSize: '24px' }}>America's best place to learn how to code free or affordably.</p>
        <p style={{ fontSize: '20px' }}>Feel free to explore our courses, enroll in courses, and view your courses after creating an account.</p>
      </div>
      <div>
        <img src={home} alt="Home" style={{ width: '400px', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Home;
