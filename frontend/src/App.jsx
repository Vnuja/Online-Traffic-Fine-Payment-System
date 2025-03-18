import React from "react";
import AdminRegister from "./Components/Admin/AdminRegister"; 
import { Route, Routes } from "react-router-dom";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";

function App() {
  return (
    <div>
      <Routes>
        {/* Admin */}
        <Route path="/admin" element={<AdminRegister />} />
        
        {/* User */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;