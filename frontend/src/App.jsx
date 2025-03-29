import { Route, Routes, useLocation } from "react-router-dom";
import FloatingShape from "./components/User Tools/FloatingShape";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Update from "./components/User/Update";
import UploadFineReceipt from "./components/User/UploadFineReceipt";
import ForgotPassword from "./components/User/ForgotPasswordPage";

//Admin Management System
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProfile from "./components/Admin/AdminProfile";
import FineManagement from "./components/Admin/FineManagement";
import UserMonitoring from "./components/Admin/UserMonitoring";

//Prediction management System
import GetStart from "./components/Predication/GetStart";
import About from "./components/Predication/About"
import Services from "./components/Predication/Services";
import Assistant from "./Components/Predication/Assistant";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/upload-fine-receipt" element={<UploadFineReceipt />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/fines" element={<FineManagement />} />
        <Route path="/admin/users" element={<UserMonitoring />} />

        {/* Prediction */}
        <Route path="/" element={<GetStart />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ai" element={<Assistant />} />


      </Routes>
    </div>
  );
}

export default App;
