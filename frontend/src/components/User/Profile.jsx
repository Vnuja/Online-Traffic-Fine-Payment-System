import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../User Tools/authStore";
import AdminManagement from "../Admin/AdminManagement";

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user has admin role
    setIsAdmin(user?.role === "admin");
  }, [user]);

  const logout = () => {
    alert("You have been logged out.");
    window.location.href = "/login";
  };

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Your account has been deleted.");
      window.location.href = "/signup";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* User Profile Section */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-white font-semibold">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone Number</p>
              <p className="text-white font-semibold">{user?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-400">Role</p>
              <p className="text-white font-semibold capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Admin Management Section - Only visible to admins */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AdminManagement />
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Profile Section */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="profile.jpg"
              alt="User"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
            />
            <h5 className="text-xl font-bold mt-4">John Doe</h5>
            <p className="text-gray-600">Sri Lanka</p>
            <hr className="my-4" />
            <p>
              <strong>Risk Score:</strong> 62 / 100
            </p>
            <p>
              <strong>Total Violations:</strong> 12
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-4">
              View Details
            </button>
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold">Profile Dashboard</h2>
            <p className="text-black">Your driving insights and account details.</p>

            <div className="flex mt-4 border-b">
              {["profile", "prediction", "settings"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === "profile" && (
                <div>
                  <h5 className="text-lg font-bold">Profile Details</h5>
                  <table className="w-full mt-2 border-collapse border border-black">
                    <tbody>
                      {[
                        { id: 'fname', label: "First Name", value: "John" },
                        { id: 'lname', label: "Last Name", value: "Doe" },
                        { id: 'email', label: "Email", value: "johndoe@example.com" },
                        { id: 'phone', label: "Phone", value: "+94 71 234 5678" },
                        { id: 'nic', label: "NIC Number", value: "2222222222" },
                        { id: 'gender', label: "Gender", value: "Male" },
                        { id: 'address', label: "Address", value: "Colombo, Sri Lanka" },
                      ].map(({ id, label, value }) => (
                        <tr key={id} className="border-b border-black">
                          <th className="p-2 text-left font-semibold border border-black">{label}</th>
                          <td className="p-2 border border-black">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Link to="/update">
                    <button className="bg-[#8F87F1] text-white px-4 py-2 rounded-lg w-full mt-4 transition-transform transform hover:scale-105">
                      Edit Details
                    </button>
                  </Link>
                </div>
              )}

              {activeTab === "prediction" && (
                <div>
                  <h5 className="text-lg font-bold">Violation Prediction</h5>
                  <p>
                    Based on your driving history, the system predicts possible
                    violations and risk level.
                  </p>
                  <table className="w-full mt-2 border-collapse border border-black">
                    <tbody>
                      <tr className="border-b border-black">
                        <th className="p-2 text-left font-semibold border border-black">
                          Future Risk Level
                        </th>
                        <td className="p-2 border border-black">
                          <span className="px-3 py-1 rounded-lg bg-yellow-500 text-black">
                            Medium
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <th className="p-2 text-left font-semibold border border-black">
                          Predicted Violations
                        </th>
                        <td className="p-2 border border-black">
                          Speeding, Traffic Signal Violation
                        </td>
                      </tr>
                      <tr>
                        <th className="p-2 text-left font-semibold border border-black">
                          Suggestions
                        </th>
                        <td className="p-2 border border-black">
                          Reduce speed in urban areas and follow traffic signals
                          carefully.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h5 className="text-lg font-bold">Settings</h5>
                  <p>Manage your account settings here.</p>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full my-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
