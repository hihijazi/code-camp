import React from 'react';
import home from "../assets/home.png";

const Home = () => {
  return (
    <div style={{ padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h2 style={{ fontSize: '45px' }}>Welcome to Code Camp</h2>
        <p style={{ fontSize: '24px' }}>America's best place to learn how to code free and affordably.</p>
        <p style={{ fontSize: '20px' }}>Anytime, anywhere learn on your suitable schedule. </p>
      </div>
      <div>
        <img src={home} alt="Home" style={{ width: '400px', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Home;
