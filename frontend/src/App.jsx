import { Route, Routes, useLocation } from "react-router-dom";
import FloatingShape from "./components/User Tools/FloatingShape";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";

//Admin Management System
import AdminLogin from "./components/Admin/Login";
import AdminRegister from "./components/Admin/AdminRegister";

function App() {
  const location = useLocation();

  // Apply different backgrounds based on the route
  const isAdminRoute =
    location.pathname === "/admin/register" ||
    location.pathname === "/admin/login";

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden 
        ${
          isAdminRoute
            ? "min-h-screen bg-gradient-to-b from-[#140d25] via-[#2a1340] to-[#402060] flex items-center justify-center relative overflow-hidden" // Dark Blood Moon Theme (Admin)
            : "min-h-screen bg-gradient-to-b from-purple-800 via-purple-600 to-purple-300 flex items-center justify-center relative overflow-hidden" // Dark Cosmic Theme (User)
        }`}
    >
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
  );
}

export default App;
