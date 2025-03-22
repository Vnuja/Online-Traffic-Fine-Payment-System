import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFines: 0,
    pendingFines: 0,
    collectedFines: 0,
    recentUsers: [],
  });

  useEffect(() => {
    // Here you would typically fetch dashboard data from your backend
    // For now, we're using mock data
    setStats({
      totalFines: 150,
      pendingFines: 45,
      collectedFines: 105,
      recentUsers: [
        { id: 1, name: "John Smith", fineAmount: 5000, status: "Pending" },
        { id: 2, name: "Jane Doe", fineAmount: 3000, status: "Paid" },
        { id: 3, name: "Mike Johnson", fineAmount: 7500, status: "Pending" },
      ],
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="admin-dashboard-nav">
        <div className="admin-dashboard-nav-brand">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-dashboard-nav-links">
          <Link to="/admin/profile" className="admin-dashboard-nav-link">
            Profile
          </Link>
          <Link to="/admin/fines" className="admin-dashboard-nav-link">
            Fine Management
          </Link>
          <Link to="/admin/users" className="admin-dashboard-nav-link">
            User Monitoring
          </Link>
          <Link to="/admin/reports" className="admin-dashboard-nav-link">
            Reports
          </Link>
          <button className="admin-dashboard-logout-btn">Logout</button>
        </div>
      </nav>

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
                {stats.recentUsers.map((user) => (
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
                      <button className="admin-dashboard-action-btn">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 