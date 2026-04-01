import Layout from "../components/Layout";
import { useState } from "react";
import SHA256 from "crypto-js/sha256";

function Verify() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const verifyFile = () => {
    if (!file) {
      alert("Select a file");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileData = event.target.result;
      const newHash = SHA256(fileData).toString();

      let evidenceList =
        JSON.parse(localStorage.getItem("evidenceList")) || [];

      const foundIndex = evidenceList.findIndex(
        (item) => item.hash === newHash
      );

      let logs = JSON.parse(localStorage.getItem("logs")) || [];

      if (foundIndex !== -1) {
        setResult("File is Original (Hash Matched)");

        evidenceList[foundIndex].status = "Verified";
        localStorage.setItem("evidenceList", JSON.stringify(evidenceList));

        logs.push({
          action: "Verified Evidence",
          user: localStorage.getItem("currentUser"),
          role: localStorage.getItem("role"),
          fileName: file.name,
          date: new Date().toLocaleString(),
        });
      } else {
        setResult("File is Tampered (Hash Not Matched)");

        logs.push({
          action: "Tampered Evidence Detected",
          user: localStorage.getItem("currentUser"),
          role: localStorage.getItem("role"),
          fileName: file.name,
          date: new Date().toLocaleString(),
        });
      }

      localStorage.setItem("logs", JSON.stringify(logs));
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Layout>
      <h1 className="page-title">Verify Digital Evidence</h1>

      <div className="admin-box">
        <p>
          Upload a file to verify its integrity. The system will generate a new
          SHA-256 hash and compare it with the original stored hash to detect tampering.
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />

        <button onClick={verifyFile} className="upload-btn">
          Verify File Integrity
        </button>

        {result && (
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            {result}
          </div>
        )}
      </div>

      <div className="admin-box">
        <h2>Verification Process</h2>
        <ul>
          <li>System generates new SHA-256 hash</li>
          <li>Hash is compared with stored hash</li>
          <li>If hashes match → File is Original</li>
          <li>If hashes do not match → File is Tampered</li>
          <li>Result is recorded in chain of custody logs</li>
        </ul>
      </div>

      <p className="footer">
        © 2026 Digital Evidence Vault | Final Year Project
      </p>
    </Layout>
  );
}

export default Verify;