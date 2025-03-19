import React from 'react';
import Navbar from '../Navbar';
import { Routes } from 'react-router-dom';

function GetStart() {
  return (
    <div>
      {/* Upper Purple Header */}
      <div style={{ backgroundColor: '#6a0dad', color: 'white', textAlign: 'center', padding: '10px 0' }}>
        <p>Welcome to the Online Traffic Fine Payment System</p>
 

      </div>

       {/* Navigation Bar */}
       <Navbar />

       

      
    </div>
  );
}

export default GetStart;

