import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../User Tools/authStore";
import { Users, FileText, Settings, ChevronRight, UserCog, LogOut } from "lucide-react";
import AdminManagement from "./AdminManagement";
import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: UserCog },
    { id: "users", label: "User Management", icon: Users },
    { id: "fines", label: "Fine Records", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { id: "total-users", label: "Total Users", value: "1,234" },
    { id: "active-fines", label: "Active Fines", value: "456" },
    { id: "monthly-revenue", label: "Monthly Revenue", value: "Rs. 245,000" },
    { id: "pending-appeals", label: "Pending Appeals", value: "28" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative z-50">
      <div className="container mx-auto px-4 py-8 relative z-50">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-8 relative z-50">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
            <p className="text-gray-400">Welcome back, {user?.firstName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-50">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 relative z-50 ${
                    activeSection === item.id
                      ? "bg-[#C68EFD] text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 relative z-50">
            {activeSection === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeSection === "users" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-50"
              >
                <AdminManagement />
              </motion.div>
            )}

            {activeSection === "fines" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Fine Records</h2>
                <p className="text-gray-400">Fine management system coming soon...</p>
              </motion.div>
            )}

            {activeSection === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Admin Settings</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-semibold">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive email alerts for new fines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C68EFD]"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Enable 2FA for enhanced security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C68EFD]"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;