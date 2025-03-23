import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./UserMonitoring.css";

const UserMonitoring = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Mock data for testing
  const mockActiveUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", lastActive: "2 minutes ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", lastActive: "5 minutes ago" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", lastActive: "10 minutes ago" },
  ];

  const mockUserActivities = [
    { id: 1, userId: 1, action: "Payment", details: "Paid fine #123", timestamp: "2024-03-20 10:30 AM" },
    { id: 2, userId: 1, action: "Profile Update", details: "Updated contact information", timestamp: "2024-03-20 09:15 AM" },
    { id: 3, userId: 2, action: "Login", details: "User logged in from Chrome", timestamp: "2024-03-20 10:25 AM" },
  ];

  useEffect(() => {
    // Simulate fetching active users
    const fetchActiveUsers = () => {
      setActiveUsers(mockActiveUsers);
      setLoading(false);
    };

    fetchActiveUsers();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchActiveUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Simulate fetching user activities
      const fetchUserActivities = () => {
        const filteredActivities = mockUserActivities.filter(
          activity => activity.userId === selectedUser.id
        );
        setUserActivities(filteredActivities);
      };

      fetchUserActivities();
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredActivities = userActivities.filter(activity => {
    if (filter === "all") return true;
    return activity.action.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="user-monitoring">
      <Navbar />
      <div className="user-monitoring-content">
        <h1>User Monitoring</h1>
        
        {/* Active Users Section */}
        <div className="active-users-section">
          <h2>Active Users</h2>
          <div className="active-users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.lastActive}</td>
                    <td>
                      <button 
                        className="view-activities-btn"
                        onClick={() => handleUserClick(user)}
                      >
                        View Activities
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activities Section */}
        {selectedUser && (
          <div className="user-activities-section">
            <h2>Activities for {selectedUser.name}</h2>
            <div className="activity-filters">
              <button 
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === "payment" ? "active" : ""}`}
                onClick={() => setFilter("payment")}
              >
                Payments
              </button>
              <button 
                className={`filter-btn ${filter === "profile" ? "active" : ""}`}
                onClick={() => setFilter("profile")}
              >
                Profile Updates
              </button>
              <button 
                className={`filter-btn ${filter === "login" ? "active" : ""}`}
                onClick={() => setFilter("login")}
              >
                Logins
              </button>
            </div>
            <div className="activities-table">
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.action}</td>
                      <td>{activity.details}</td>
                      <td>{activity.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMonitoring; 