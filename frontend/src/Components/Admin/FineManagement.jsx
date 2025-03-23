import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./FineManagement.css";

const FineManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fines, setFines] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    fetchFines();
  }, [navigate]);

  const fetchFines = async () => {
    try {
      setLoading(true);
      // For testing, using mock data until backend is ready
      const mockData = [
        {
          id: 1,
          driverName: "John Doe",
          licenseNumber: "ABC123",
          fineType: "Speeding",
          amount: 5000,
          date: "2024-03-20",
          location: "Colombo",
          status: "Pending"
        },
        {
          id: 2,
          driverName: "Jane Smith",
          licenseNumber: "XYZ789",
          fineType: "Parking Violation",
          amount: 3000,
          date: "2024-03-19",
          location: "Kandy",
          status: "Approved"
        }
      ];
      setFines(mockData);
      // Uncomment when backend is ready
      // const response = await axios.get('/api/admin/fines', {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      // });
      // setFines(response.data);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFines = fines.filter((fine) => {
    const matchesFilter =
      filter === "all" || fine.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      fine.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = async (fineId, newStatus) => {
    try {
      // For testing, just update the local state
      setFines(fines.map(fine => 
        fine.id === fineId ? { ...fine, status: newStatus } : fine
      ));
      // Uncomment when backend is ready
      // await axios.put(`/api/admin/fines/${fineId}`, 
      //   { status: newStatus },
      //   { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      // );
      // fetchFines();
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };

  const handleGenerateReport = async (fineId) => {
    try {
      // For testing, just show an alert
      alert("Report generated and sent successfully!");
      // Uncomment when backend is ready
      // await axios.post(`/api/admin/fines/${fineId}/report`, {}, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      // });
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const handleDeleteFine = async (fineId) => {
    if (window.confirm("Are you sure you want to delete this fine?")) {
      try {
        // For testing, just update the local state
        setFines(fines.filter(fine => fine.id !== fineId));
        // Uncomment when backend is ready
        // await axios.delete(`/api/admin/fines/${fineId}`, {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
        // });
        // fetchFines();
      } catch (error) {
        console.error("Error deleting fine:", error);
      }
    }
  };

  if (loading) {
    return <div className="fine-management-loading">Loading...</div>;
  }

  return (
    <div className="fine-management">
      <Navbar />
      <div className="fine-management-content">
        <div className="fine-management-header top_layer">
          <div className="fine-management-filters">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="fine-management-filter"
            >
              <option value="all">All Fines</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search by driver name or license number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="fine-management-search"
            />
          </div>
        </div>

        <div className="fine-management-table-container top_layer">
          <table className="fine-management-table">
            <thead>
              <tr>
                <th>Fine ID</th>
                <th>Driver Name</th>
                <th>License Number</th>
                <th>Fine Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.length > 0 ? (
                filteredFines.map((fine) => (
                  <tr key={fine.id}>
                    <td>{fine.id}</td>
                    <td>{fine.driverName}</td>
                    <td>{fine.licenseNumber}</td>
                    <td>{fine.fineType}</td>
                    <td>Rs. {fine.amount}</td>
                    <td>{fine.date}</td>
                    <td>{fine.location}</td>
                    <td>
                      <span
                        className={`fine-management-status ${fine.status.toLowerCase()}`}
                      >
                        {fine.status}
                      </span>
                    </td>
                    <td>
                      <div className="fine-management-actions">
                        {fine.status === "Pending" && (
                          <>
                            <button
                              className="fine-management-approve-btn"
                              onClick={() => handleStatusChange(fine.id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="fine-management-reject-btn"
                              onClick={() => handleStatusChange(fine.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {fine.status === "Approved" && (
                          <button
                            className="fine-management-report-btn"
                            onClick={() => handleGenerateReport(fine.id)}
                          >
                            Generate Report
                          </button>
                        )}
                        <button
                          className="fine-management-delete-btn"
                          onClick={() => handleDeleteFine(fine.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="fine-management-no-data">
                    No fines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FineManagement; 