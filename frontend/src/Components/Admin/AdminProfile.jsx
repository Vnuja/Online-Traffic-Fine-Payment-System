import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    if (!currentAdmin) {
      navigate("/admin/login");
      return;
    }
    setAdmin(currentAdmin);
    setEditedAdmin(currentAdmin);
    setLoading(false);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
    const updatedAdmins = registeredAdmins.map(a => 
      a.email === admin.email ? editedAdmin : a
    );
    localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins));
    localStorage.setItem("currentAdmin", JSON.stringify(editedAdmin));
    setAdmin(editedAdmin);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
      const updatedAdmins = registeredAdmins.filter(a => a.email !== admin.email);
      localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins));
      localStorage.removeItem("currentAdmin");
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }
  };

  const handleCancel = () => {
    setEditedAdmin(admin);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedAdmin({
      ...editedAdmin,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="admin-profile-loading">Loading...</div>;
  }

  return (
    <div className="admin-profile">
      
        <div className="admin-profile-info">
          <div className="admin-profile-field">
          <h1>Admin Profile</h1>
            <label>Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedAdmin.username}
                onChange={handleChange}
                className="admin-profile-input"
              />
            ) : (
              <p>{admin.username}</p>
            )}
          </div>
          <div className="admin-profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedAdmin.email}
                onChange={handleChange}
                className="admin-profile-input"
              />
            ) : (
              <p>{admin.email}</p>
            )}
          </div>
          <div className="admin-profile-field">
            <label>NIC Number</label>
            {isEditing ? (
              <input
                type="text"
                name="nic"
                value={editedAdmin.nic}
                onChange={handleChange}
                className="admin-profile-input"
              />
            ) : (
              <p>{admin.nic}</p>
            )}
          </div>
          <div className="admin-profile-field">
            <label>Mobile Number</label>
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={editedAdmin.mobile}
                onChange={handleChange}
                className="admin-profile-input"
              />
            ) : (
              <p>{admin.mobile}</p>
            )}
          </div>
          <div className="admin-profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="admin-profile-save-btn">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="admin-profile-cancel-btn">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={handleEdit} className="admin-profile-edit-btn">
                  Edit Profile
                </button>
                <button onClick={handleDelete} className="admin-profile-delete-btn">
                  Delete Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default AdminProfile; 