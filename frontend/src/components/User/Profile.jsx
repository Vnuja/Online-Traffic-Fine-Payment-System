import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const logout = () => {
    alert("You have been logged out.");
    window.location.href = "/login"; // Redirect to login page
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Your account has been deleted.");
      window.location.href = "/signup"; // Redirect to signup page after deletion
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <img src="profile.jpg" alt="User" className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500" />
          <h2 className="text-xl font-semibold mt-3">John Doe</h2>
          <p className="text-gray-600">Sri Lanka</p>
          <hr className="my-4" />
          <p className="text-lg">
            <strong>Risk Score:</strong> 62 / 100
          </p>
          <p className="text-lg">
            <strong>Total Violations:</strong> 12
          </p>
          <button className="bg-blue-500 text-white w-full py-2 rounded-lg mt-3">View Details</button>
        </div>

        {/* Right Content Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold">Profile Dashboard</h2>
          <p className="text-gray-500">Your driving insights and account details.</p>

          {/* Tabs */}
          <div className="flex space-x-4 mt-4 border-b">
            <button className={`py-2 px-4 ${activeTab === "profile" ? "border-b-4 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("profile")}>
              Profile
            </button>
            <button className={`py-2 px-4 ${activeTab === "prediction" ? "border-b-4 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("prediction")}>
              Prediction
            </button>
            <button className={`py-2 px-4 ${activeTab === "settings" ? "border-b-4 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("settings")}>
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "profile" && (
              <div>
                <h5 className="text-lg font-semibold">Profile Details</h5>
                <table className="w-full text-left border mt-3">
                  <tbody>
                    <tr className="border-b">
                      <th className="p-3">First Name</th>
                      <td className="p-3">John</td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-3">Last Name</th>
                      <td className="p-3">Doe</td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-3">Email</th>
                      <td className="p-3">johndoe@example.com</td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-3">Phone</th>
                      <td className="p-3">+94 71 234 5678</td>
                    </tr>
                    <tr>
                      <th className="p-3">Address</th>
                      <td className="p-3">Colombo, Sri Lanka</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "prediction" && (
              <div>
                <h5 className="text-lg font-semibold">Violation Prediction</h5>
                <p className="text-gray-600 mt-2">
                  Based on your driving history, the system predicts possible violations and risk level.
                </p>
                <table className="w-full border mt-3">
                  <tbody>
                    <tr className="border-b">
                      <th className="p-3">Future Risk Level</th>
                      <td className="p-3">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded-md">Medium</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-3">Predicted Violations</th>
                      <td className="p-3">Speeding, Traffic Signal Violation</td>
                    </tr>
                    <tr>
                      <th className="p-3">Suggestions</th>
                      <td className="p-3">Reduce speed in urban areas and follow traffic signals carefully.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h5 className="text-lg font-semibold">Settings</h5>
                <p className="text-gray-600 mt-2">Manage your account settings here.</p>
                <button className="bg-gray-500 text-white w-full py-2 rounded-lg mt-3" onClick={logout}>
                  Logout
                </button>
                <button className="bg-red-600 text-white w-full py-2 rounded-lg mt-3" onClick={deleteAccount}>
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;