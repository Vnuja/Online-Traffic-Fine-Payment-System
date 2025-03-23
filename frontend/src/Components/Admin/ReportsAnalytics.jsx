import { useState, useEffect } from "react";
import "./ReportsAnalytics.css";
import AdminNavbar from "./Header";

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month"); // day, week, month, year
  const [stats, setStats] = useState({
    totalFines: 0,
    totalAmount: 0,
    pendingFines: 0,
    approvedFines: 0,
    rejectedFines: 0,
    fineTypes: [],
    dailyStats: [],
  });

  useEffect(() => {
    // Here you would typically fetch analytics data from your backend
    // For now, we're using mock data
    setStats({
      totalFines: 150,
      totalAmount: 750000,
      pendingFines: 45,
      approvedFines: 95,
      rejectedFines: 10,
      fineTypes: [
        { type: "Speeding", count: 50, amount: 250000 },
        { type: "Red Light", count: 30, amount: 150000 },
        { type: "Parking", count: 40, amount: 200000 },
        { type: "Other", count: 30, amount: 150000 },
      ],
      dailyStats: [
        { date: "2024-03-15", count: 5, amount: 25000 },
        { date: "2024-03-14", count: 8, amount: 40000 },
        { date: "2024-03-13", count: 3, amount: 15000 },
        { date: "2024-03-12", count: 6, amount: 30000 },
        { date: "2024-03-11", count: 4, amount: 20000 },
      ],
    });
  }, [timeRange]);

  const handleExportReport = async (format) => {
    try {
      // Here you would typically send a request to generate and download the report
      // await axios.post(`/api/admin/reports/export`, { format, timeRange });
      alert(`Report exported successfully in ${format} format!`);
    } catch (error) {
      console.error("Error exporting report:", error);
    }
  };

  const handleSendReport = async () => {
    try {
      // Here you would typically send a request to email the report
      // await axios.post('/api/admin/reports/send');
      alert("Report sent successfully via email!");
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  return (
    <>
    <AdminNavbar /> 
    <div className="reports-analytics">
      <div className="reports-analytics-header">
        <h1>Reports & Analytics</h1>
        <div className="reports-analytics-actions">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="reports-analytics-time-range"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <div className="reports-analytics-export">
            <button
              className="reports-analytics-export-btn"
              onClick={() => handleExportReport("PDF")}
            >
              Export PDF
            </button>
            <button
              className="reports-analytics-export-btn"
              onClick={() => handleExportReport("CSV")}
            >
              Export CSV
            </button>
            <button
              className="reports-analytics-send-btn"
              onClick={handleSendReport}
            >
              Send Report
            </button>
          </div>
        </div>
      </div>

      <div className="reports-analytics-stats">
        <div className="reports-analytics-stat-card">
          <h3>Total Fines</h3>
          <p className="reports-analytics-stat-number">{stats.totalFines}</p>
        </div>
        <div className="reports-analytics-stat-card">
          <h3>Total Amount</h3>
          <p className="reports-analytics-stat-number">
            Rs. {stats.totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="reports-analytics-stat-card">
          <h3>Pending Fines</h3>
          <p className="reports-analytics-stat-number">{stats.pendingFines}</p>
        </div>
        <div className="reports-analytics-stat-card">
          <h3>Approved Fines</h3>
          <p className="reports-analytics-stat-number">{stats.approvedFines}</p>
        </div>
        <div className="reports-analytics-stat-card">
          <h3>Rejected Fines</h3>
          <p className="reports-analytics-stat-number">{stats.rejectedFines}</p>
        </div>
      </div>

      <div className="reports-analytics-charts">
        <div className="reports-analytics-chart">
          <h2>Fine Types Distribution</h2>
          <div className="reports-analytics-chart-container">
            <table className="reports-analytics-table">
              <thead>
                <tr>
                  <th>Fine Type</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats.fineTypes.map((type) => (
                  <tr key={type.type}>
                    <td>{type.type}</td>
                    <td>{type.count}</td>
                    <td>Rs. {type.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="reports-analytics-chart">
          <h2>Daily Statistics</h2>
          <div className="reports-analytics-chart-container">
            <table className="reports-analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Count</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats.dailyStats.map((stat) => (
                  <tr key={stat.date}>
                    <td>{stat.date}</td>
                    <td>{stat.count}</td>
                    <td>Rs. {stat.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ReportsAnalytics; 