import React from 'react';
import './Navbar.css'; // Import the external CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">LOGO</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
