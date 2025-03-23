import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "./Navbar";
import "./AdminProfile.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  nic: yup
    .string()
    .matches(/^([0-9]{9}[vVxX]|[0-9]{12})$/, "Invalid NIC format")
    .required("NIC is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
});

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdminManagement, setShowAdminManagement] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    if (!currentAdmin) {
      navigate("/admin/login");
      return;
    }
    setAdmin(currentAdmin);
    reset(currentAdmin);
    
    // Load all admins
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
    setAllAdmins(registeredAdmins);
  }, [navigate, reset]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onSubmit = async (data) => {
    try {
      const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
      const updatedAdmins = registeredAdmins.map(a => 
        a.email === admin.email ? data : a
      );
      localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins));
      localStorage.setItem("currentAdmin", JSON.stringify(data));
      setAdmin(data);
      setAllAdmins(updatedAdmins);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
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
    setIsEditing(false);
    reset(admin);
  };

  const handleAddAdmin = (data) => {
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
    registeredAdmins.push(data);
    localStorage.setItem("registeredAdmins", JSON.stringify(registeredAdmins));
    setAllAdmins(registeredAdmins);
    alert("Admin added successfully!");
  };

  const handleUpdateAdmin = (data) => {
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
    const updatedAdmins = registeredAdmins.map(a => 
      a.email === selectedAdmin.email ? data : a
    );
    localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins));
    setAllAdmins(updatedAdmins);
    setSelectedAdmin(null);
    alert("Admin updated successfully!");
  };

  const handleDeleteAdmin = (email) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
      const updatedAdmins = registeredAdmins.filter(a => a.email !== email);
      localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins));
      setAllAdmins(updatedAdmins);
      alert("Admin deleted successfully!");
    }
  };

  if (!admin) {
    return <div className="admin-profile-loading">Loading...</div>;
  }

  return (
    <div className="admin-profile">
      <Navbar />
      <div className="admin-profile-content">
        <h1>Admin Profile</h1>
        
        {/* Profile Section */}
        <div className="admin-profile-info">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="admin-profile-field">
              <label>Username</label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    {...register("username")}
                    className="admin-profile-input"
                  />
                  <p className="admin-profile-error">{errors.username?.message}</p>
                </>
              ) : (
                <p>{admin.username}</p>
              )}
            </div>
            <div className="admin-profile-field">
              <label>Email</label>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    {...register("email")}
                    className="admin-profile-input"
                  />
                  <p className="admin-profile-error">{errors.email?.message}</p>
                </>
              ) : (
                <p>{admin.email}</p>
              )}
            </div>
            <div className="admin-profile-field">
              <label>Password</label>
              {isEditing ? (
                <>
                  <input
                    type="password"
                    {...register("password")}
                    className="admin-profile-input"
                  />
                  <p className="admin-profile-error">{errors.password?.message}</p>
                </>
              ) : (
                <p>••••••••</p>
              )}
            </div>
            <div className="admin-profile-field">
              <label>NIC Number</label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    {...register("nic")}
                    className="admin-profile-input"
                  />
                  <p className="admin-profile-error">{errors.nic?.message}</p>
                </>
              ) : (
                <p>{admin.nic}</p>
              )}
            </div>
            <div className="admin-profile-field">
              <label>Mobile Number</label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    {...register("mobile")}
                    className="admin-profile-input"
                    maxLength="10"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  <p className="admin-profile-error">{errors.mobile?.message}</p>
                </>
              ) : (
                <p>{admin.mobile}</p>
              )}
            </div>
            <div className="admin-profile-actions">
              {isEditing ? (
                <>
                  <button type="submit" className="admin-profile-save-btn">
                    Save Changes
                  </button>
                  <button type="button" onClick={handleCancel} className="admin-profile-cancel-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={handleEdit} className="admin-profile-edit-btn">
                    Edit Profile
                  </button>
                  <button type="button" onClick={handleDelete} className="admin-profile-delete-btn">
                    Delete Profile
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Admin Management Section */}
        <div className="admin-management-section">
          <h2>Admin Management</h2>
          <button 
            className="admin-profile-edit-btn"
            onClick={() => setShowAdminManagement(!showAdminManagement)}
          >
            {showAdminManagement ? "Hide Admin Management" : "Show Admin Management"}
          </button>

          {showAdminManagement && (
            <div className="admin-list">
              <h3>All Admins</h3>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>NIC</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAdmins.map((adminUser) => (
                    <tr key={adminUser.email}>
                      <td>{adminUser.username}</td>
                      <td>{adminUser.email}</td>
                      <td>{adminUser.nic}</td>
                      <td>{adminUser.mobile}</td>
                      <td>
                        <button 
                          className="admin-profile-edit-btn"
                          onClick={() => setSelectedAdmin(adminUser)}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-profile-delete-btn"
                          onClick={() => handleDeleteAdmin(adminUser.email)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedAdmin && (
            <div className="admin-edit-form">
              <h3>Edit Admin: {selectedAdmin.username}</h3>
              <form onSubmit={handleSubmit(handleUpdateAdmin)}>
                <div className="admin-profile-field">
                  <label>Username</label>
                  <input
                    type="text"
                    {...register("username")}
                    className="admin-profile-input"
                    defaultValue={selectedAdmin.username}
                  />
                </div>
                <div className="admin-profile-field">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="admin-profile-input"
                    defaultValue={selectedAdmin.email}
                  />
                </div>
                <div className="admin-profile-field">
                  <label>Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className="admin-profile-input"
                    defaultValue={selectedAdmin.password}
                  />
                </div>
                <div className="admin-profile-field">
                  <label>NIC Number</label>
                  <input
                    type="text"
                    {...register("nic")}
                    className="admin-profile-input"
                    defaultValue={selectedAdmin.nic}
                  />
                </div>
                <div className="admin-profile-field">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    {...register("mobile")}
                    className="admin-profile-input"
                    defaultValue={selectedAdmin.mobile}
                    maxLength="10"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>
                <div className="admin-profile-actions">
                  <button type="submit" className="admin-profile-save-btn">
                    Update Admin
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedAdmin(null)}
                    className="admin-profile-cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 