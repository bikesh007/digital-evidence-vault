import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function EvidenceList() {
  const [evidenceList, setEvidenceList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("evidenceList")) || [];
    setEvidenceList(data);
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Evidence List</h1>

      <div className="admin-box">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date</th>
              <th>Uploaded By</th>
              <th>Status</th>
              <th>Hash</th>
            </tr>
          </thead>

          <tbody>
            {evidenceList.map((item, index) => (
              <tr key={index}>
                <td>{item.fileName}</td>
                <td>{item.date}</td>
                <td>{item.uploadedBy}</td>
                <td
                  style={{
                    color:
                      item.status === "Verified"
                        ? "lightgreen"
                        : item.status === "Tampered"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </td>
                <td style={{ fontSize: "12px" }}>{item.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footer">
        © 2026 Digital Evidence Vault | Final Year Project
      </p>
    </Layout>
  );
}

export default EvidenceList;