import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(userData);

    const evidence = JSON.parse(localStorage.getItem("evidenceList")) || [];
    setEvidenceCount(evidence.length);

    const logData = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(logData);
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          {/* TOP CARDS */}
          <div className="admin-cards">
            <div className="admin-card">
              <h2>Total Cases</h2>
              <p>1,256</p>
            </div>

            <div className="admin-card">
              <h2>Total Users</h2>
              <p>{users.length}</p>
            </div>

            <div className="admin-card">
              <h2>Total Evidence</h2>
              <p>{evidenceCount}</p>
            </div>

            <div className="admin-card">
              <h2>Storage Usage</h2>
              <p>2.8 TB / 5 TB</p>
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="admin-grid">
            <div className="admin-box">
              <h2>User Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-box">
              <h2>System Status</h2>

              <div className="status-row">
                <span>Server Status</span>
                <span className="status-green">Online</span>
              </div>

              <div className="status-row">
                <span>Database</span>
                <span className="status-green">Healthy</span>
              </div>

              <div className="status-row">
                <span>Backup</span>
                <span className="status-green">Up to Date</span>
              </div>

              <div className="status-row">
                <span>Security Alerts</span>
                <span className="status-red">0 Alerts</span>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="admin-bottom">
            <div className="admin-box">
              <h2>Recent Cases</h2>
              <ul>
                <li>Burglary Investigation</li>
                <li>Cyber Fraud Case</li>
                <li>Homicide Case</li>
              </ul>
            </div>

            <div className="admin-box">
              <h2>Audit Logs</h2>
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(0, 3).map((log, index) => (
                    <tr key={index}>
                      <td>{log.action}</td>
                      <td>{log.user}</td>
                      <td>{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Admin;