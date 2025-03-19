import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './GetStart.css';

const images = [
  '/3-2.jpg',
  '/thumb-3.jpg',
  '/z_p18-Making-1.png',
  '/10-e1741955331168.jpg'
];

function GetStart() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Upper Purple Header */}
      <div className="header">
        <p>Welcome to the Online Traffic Fine Payment System</p>
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <span className="highlight">Online <br />
            Traffic Fine Payment System</span>
          </h1>
          <p>
            A secure and convenient way to check and pay your traffic fines online. <br />
            No more long queues—pay in just a few clicks!
          </p>
          <button className="get-started">Get Started</button>
        </div>

        {/* Image Slideshow */}
        <div className="hero-image">
          <img src={images[currentImage]} alt="Police Officers" />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GetStart;
