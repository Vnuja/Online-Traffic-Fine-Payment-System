<<<<<<< HEAD
import React from "react";
import AdminRegister from "./Components/Admin/AdminRegister"; 
=======
import { Route, Routes } from "react-router-dom";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
>>>>>>> e3f291480ce07b38357668e5cce8132c21161d70

function App() {
  return (
<<<<<<< HEAD
    <div className="app-container">
      <AdminRegister /> {}
    </div>
  );
=======
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
>>>>>>> e3f291480ce07b38357668e5cce8132c21161d70
}

export default App;
