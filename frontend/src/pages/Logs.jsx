import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(data);
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Chain of Custody Logs</h1>

      <div className="admin-box">
        <p style={{ marginBottom: "15px" }}>
          This log records every action performed on digital evidence including upload,
          verification, and tamper detection. This ensures accountability and evidence tracking.
        </p>

        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Role</th>
              <th>File</th>
              <th>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.action}</td>
                <td>{log.user}</td>
                <td>{log.role}</td>
                <td>{log.fileName}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-box">
        <h2>Why Chain of Custody is Important?</h2>
        <ul>
          <li>Tracks who accessed the evidence</li>
          <li>Tracks who uploaded the evidence</li>
          <li>Tracks verification activity</li>
          <li>Maintains legal integrity of evidence</li>
          <li>Prevents unauthorized tampering</li>
        </ul>
      </div>

      <p className="footer">
        © 2026 Digital Evidence Vault | Final Year Project
      </p>
    </Layout>
  );
}

export default Logs;  