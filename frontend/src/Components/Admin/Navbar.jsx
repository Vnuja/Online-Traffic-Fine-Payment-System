import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("currentAdmin");
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">
        <img src="/src/assets/2.png" alt="Admin Panel Logo" className="admin-logo" />
      </div>
      <div className="admin-navbar-links">
        <button onClick={() => navigate("/admin/dashboard")} className="admin-navbar-link">
          Dashboard
        </button>
        <button onClick={() => navigate("/admin/profile")} className="admin-navbar-link">
          Profile
        </button>
        <button onClick={() => navigate("/admin/fines")} className="admin-navbar-link">
          Fine Management
        </button>
        <button onClick={() => navigate("/admin/users")} className="admin-navbar-link">
          User Monitoring
        </button>
        <button onClick={() => navigate("/admin/reports")} className="admin-navbar-link">
          Reports
        </button>
      </div>
      <button onClick={handleLogout} className="admin-navbar-logout-btn">
        Logout
      </button>
    </nav>
  );
};

export default Navbar; 