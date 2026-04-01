import Layout from "../components/Layout";
import { useState } from "react";
import SHA256 from "crypto-js/sha256";

function Upload() {
  const [file, setFile] = useState(null);
  const [generatedHash, setGeneratedHash] = useState("");

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileData = event.target.result;
      const hash = SHA256(fileData).toString();

      setGeneratedHash(hash); // show hash on screen

      // Get existing evidence
      let evidenceList =
        JSON.parse(localStorage.getItem("evidenceList")) || [];

      // Create new evidence object
      const newEvidence = {
        fileName: file.name,
        date: new Date().toLocaleString(),
        uploadedBy: localStorage.getItem("currentUser"),
        status: "Pending",
        hash: hash,
      };

      evidenceList.push(newEvidence);
      localStorage.setItem("evidenceList", JSON.stringify(evidenceList));

      // Add log entry
      let logs = JSON.parse(localStorage.getItem("logs")) || [];

      logs.push({
        action: "Uploaded Evidence",
        user: localStorage.getItem("currentUser"),
        role: localStorage.getItem("role"),
        fileName: file.name,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem("logs", JSON.stringify(logs));

      alert("Evidence Uploaded Successfully");
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Layout>
      <h1 className="page-title">Upload Digital Evidence</h1>

      <div className="admin-box">
        <p>
          Upload digital evidence files. The system will generate a SHA-256
          hash to ensure file integrity and prevent tampering.
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <button className="upload-btn" onClick={handleUpload}>
          Upload & Generate Hash
        </button>

        {/* SHOW GENERATED HASH */}
        {generatedHash && (
          <div style={{ marginTop: "20px" }}>
            <h3>Generated SHA-256 Hash:</h3>
            <p style={{ wordBreak: "break-all", fontSize: "12px" }}>
              {generatedHash}
            </p>
          </div>
        )}
      </div>

      <div className="admin-box">
        <h2>Instructions</h2>
        <ul>
          <li>Upload original evidence file only</li>
          <li>System generates SHA-256 hash</li>
          <li>Hash is stored for tamper detection</li>
          <li>Every upload is recorded in chain of custody</li>
        </ul>
      </div>

      <p className="footer">
        © 2026 Digital Evidence Vault | Final Year Project
      </p>
    </Layout>
  );
}

export default Upload;