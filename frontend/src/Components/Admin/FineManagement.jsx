import { useState, useEffect } from "react";
import "./FineManagement.css";

const FineManagement = () => {
  const [fines, setFines] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Here you would typically fetch fines data from your backend
    // For now, we're using mock data
    setFines([
      {
        id: 1,
        driverName: "John Smith",
        licenseNumber: "DL123456",
        fineType: "Speeding",
        amount: 5000,
        date: "2024-03-15",
        status: "Pending",
        location: "Colombo",
      },
      {
        id: 2,
        driverName: "Jane Doe",
        licenseNumber: "DL789012",
        fineType: "Red Light Violation",
        amount: 3000,
        date: "2024-03-14",
        status: "Approved",
        location: "Kandy",
      },
      {
        id: 3,
        driverName: "Mike Johnson",
        licenseNumber: "DL345678",
        fineType: "Parking Violation",
        amount: 1500,
        date: "2024-03-13",
        status: "Rejected",
        location: "Galle",
      },
    ]);
  }, []);

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
      // Here you would typically send a PUT request to update the fine status
      // await axios.put(`/api/admin/fines/${fineId}`, { status: newStatus });
      setFines(
        fines.map((fine) =>
          fine.id === fineId ? { ...fine, status: newStatus } : fine
        )
      );
    } catch (error) {
      console.error("Error updating fine status:", error);
    }
  };

  const handleGenerateReport = async (fineId) => {
    try {
      // Here you would typically send a request to generate and send the report
      // await axios.post(`/api/admin/fines/${fineId}/report`);
      alert("Report generated and sent successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="fine-management">
      <div className="fine-management-header">
        <h1>Fine Management</h1>
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

      <div className="fine-management-table-container">
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
            {filteredFines.map((fine) => (
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FineManagement; 