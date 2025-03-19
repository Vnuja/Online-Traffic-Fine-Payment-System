import React from "react";
import { Route, Routes } from "react-router-dom";

//Admin Management System
import AdminRegister from "./Components/Admin/AdminRegister"; 
import AdminLogin from "./Components/Admin/AdminLogin";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";

function App() {
  return (
    <div>
      <Routes>
        {/* Admin */}
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        
        {/* User */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;