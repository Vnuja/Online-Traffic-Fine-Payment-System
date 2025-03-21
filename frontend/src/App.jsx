import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/User Tools/FloatingShape";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";

//Admin Management System
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-purple-600 to-purple-300 flex items-center justify-center relative overflow-hidden">
      <FloatingShape />
      <Routes>

        {/* User Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </div>
  )
}

export default App