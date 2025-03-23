import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img
            src="/prediction_image/7.jpeg"
            alt="Police FPS"
            className="logo-img"
          />
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          <Link to="/login"><button className="sign-in">Sign In</button></Link>
          <Link to="/signup"><button className="sign-up">Sign Up</button></Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
