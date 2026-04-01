import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [tamperedCount, setTamperedCount] = useState(0);

  useEffect(() => {
    const evidence = JSON.parse(localStorage.getItem("evidenceList")) || [];
    setEvidenceCount(evidence.length);

    const verified = evidence.filter(e => e.status === "Verified");
    setVerifiedCount(verified.length);

    const tampered = evidence.filter(e => e.status === "Tampered");
    setTamperedCount(tampered.length);
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1 className="page-title">Police Dashboard</h1>

          {/* TOP CARDS */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h2>Total Evidence</h2>
              <p>{evidenceCount}</p>
            </div>

            <div className="dashboard-card">
              <h2>Verified Evidence</h2>
              <p>{verifiedCount}</p>
            </div>

            <div className="dashboard-card">
              <h2>Tampered Evidence</h2>
              <p>{tamperedCount}</p>
            </div>

            <div className="dashboard-card">
              <h2>Storage Usage</h2>
              <p>2GB / 5GB</p>
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="dashboard-grid">
            <div className="dashboard-box">
              <h2>Recent Cases</h2>
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Case Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CR-01</td>
                    <td>Cyber Fraud</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>CR-02</td>
                    <td>Burglary</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="dashboard-box">
              <h2>Quick Upload</h2>
              <input type="file" />
              <button className="upload-btn">Upload Evidence</button>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="dashboard-bottom">
            <div className="dashboard-box">
              <h2>My Tasks</h2>
              <ul>
                <li>Upload crime scene photos</li>
                <li>Submit case report</li>
                <li>Verify evidence</li>
              </ul>
            </div>

            <div className="dashboard-box">
              <h2>Recent Uploads</h2>
              <ul>
                <li>image1.jpg</li>
                <li>video1.mp4</li>
                <li>report.pdf</li>
              </ul>
            </div>
          </div>

          <p className="footer">
            © 2026 Digital Evidence Vault | Final Year Project
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;