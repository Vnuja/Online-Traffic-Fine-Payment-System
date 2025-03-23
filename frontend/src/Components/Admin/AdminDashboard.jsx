import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFines: 0,
    pendingFines: 0,
    collectedFines: 0,
    recentUsers: [],
  });

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // For testing, using mock data until backend is ready
      const mockData = {
        totalFines: 150,
        pendingFines: 45,
        collectedFines: 105,
        recentUsers: [
          {
            id: 1,
            name: "John Doe",
            fineAmount: 5000,
            status: "Pending"
          },
          {
            id: 2,
            name: "Jane Smith",
            fineAmount: 3000,
            status: "Paid"
          }
        ]
      };
      setStats(mockData);
      // Uncomment when backend is ready
      // const response = await axios.get('/api/admin/dashboard', {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      // });
      // setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-dashboard-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <Navbar />
      <main className="admin-dashboard-main">
        <div className="admin-dashboard-stats">
          <div className="admin-dashboard-stat-card">
            <h3>Total Fines</h3>
            <p className="admin-dashboard-stat-number">{stats.totalFines}</p>
          </div>
          <div className="admin-dashboard-stat-card">
            <h3>Pending Fines</h3>
            <p className="admin-dashboard-stat-number">{stats.pendingFines}</p>
          </div>
          <div className="admin-dashboard-stat-card">
            <h3>Collected Fines</h3>
            <p className="admin-dashboard-stat-number">{stats.collectedFines}</p>
          </div>
        </div>

        <div className="admin-dashboard-recent">
          <h2>Recent Users</h2>
          <div className="admin-dashboard-table-container">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Fine Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.length > 0 ? (
                  stats.recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>Rs. {user.fineAmount}</td>
                      <td>
                        <span
                          className={`admin-dashboard-status ${
                            user.status === "Paid" ? "paid" : "pending"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="admin-dashboard-action-btn"
                          onClick={() => navigate(`/admin/fines/${user.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="admin-dashboard-no-data">
                      No recent users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 