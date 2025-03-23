import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, X, Check, UserCog, Search } from "lucide-react";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "admin"
  });

  // Load admins from localStorage on component mount
  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
    setAdmins(storedAdmins);
  }, []);

  // Save admins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdmin = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setAdmins(prev => [...prev, newAdmin]);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "admin"
    });
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin.id);
    setFormData({
      ...admin,
      password: "" // Clear password for security
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setAdmins(prev =>
      prev.map(admin =>
        admin.id === editingAdmin 
          ? { 
              ...admin, 
              ...formData,
              password: formData.password || admin.password // Keep old password if new one is not provided
            } 
          : admin
      )
    );
    setEditingAdmin(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "admin"
    });
  };

  const handleDelete = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    }
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "admin"
    });
  };

  // Filter admins based on search query
  const filteredAdmins = admins.filter(admin => 
    admin.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl relative z-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <UserCog className="w-6 h-6 text-[#C68EFD]" />
          <h2 className="text-2xl font-bold text-white">Admin Management</h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Existing Admins Table */}
      <div className="mb-8 overflow-x-auto relative z-50">
        <table className="w-full text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map(admin => (
              <tr key={admin.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-4 py-3">{admin.firstName} {admin.lastName}</td>
                <td className="px-4 py-3">{admin.email}</td>
                <td className="px-4 py-3">{admin.phoneNumber}</td>
                <td className="px-4 py-3">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="p-1 text-blue-400 hover:text-blue-300 relative z-50"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="p-1 text-red-400 hover:text-red-300 relative z-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Admin Form */}
      <form onSubmit={editingAdmin ? handleUpdate : handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-50">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={editingAdmin ? "New Password (optional)" : "Password"}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
          required={!editingAdmin}
        />
        <div className="md:col-span-2 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 bg-[#C68EFD] text-white rounded-lg hover:bg-[#B07CE5] transition-colors"
            type="submit"
          >
            {editingAdmin ? "Update Admin" : "Add Admin"}
          </motion.button>
          {editingAdmin && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminManagement; 