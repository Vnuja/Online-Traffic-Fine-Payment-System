import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
    <div className="container mx-auto mt-8 p-4">
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
                <table className="w-full mt-2 border-collapse border border-gray-300">
                  <tbody>
                    {[
                      ["First Name", "John"],
                      ["Last Name", "Doe"],
                      ["Email", "johndoe@example.com"],
                      ["Phone", "+94 71 234 5678"],
                      ["NIC Number", "2222222222"],
                      ["Gender", "Male"],
                      ["Address", "Colombo, Sri Lanka"],
                    ].map(([label, value], index) => (
                      <tr key={index} className="border-b">
                        <th className="p-2 text-left font-semibold">{label}</th>
                        <td className="p-2">{value}</td>
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
                <table className="w-full mt-2 border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border-b">
                      <th className="p-2 text-left font-semibold">
                        Future Risk Level
                      </th>
                      <td className="p-2">
                        <span className="px-3 py-1 rounded-lg bg-yellow-500 text-black">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-2 text-left font-semibold">
                        Predicted Violations
                      </th>
                      <td className="p-2">
                        Speeding, Traffic Signal Violation
                      </td>
                    </tr>
                    <tr>
                      <th className="p-2 text-left font-semibold">
                        Suggestions
                      </th>
                      <td className="p-2">
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
    </div>
  );
};

export default Profile;
