import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/User Tools/FloatingShape";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Update from "./components/User/Update";
import UploadFineReceipt from "./components/User/UploadFineReceipt";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-purple-600 to-purple-300 flex items-center justify-center relative overflow-hidden">
      <FloatingShape />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/upload-fine-receipt" element={<UploadFineReceipt />} />
      </Routes>
    </div>
  )
}

export default App