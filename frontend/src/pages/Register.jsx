import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      alert("Email already registered");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
    navigate("/");
  };

 return (
  <div className="login-bg flex items-center justify-center">

    <div className="split-container">

      {/* LEFT SIDE */}
      <div className="left-panel">
        <h1 className="text-4xl font-bold mb-4">Create Account</h1>
        <p className="mb-6">
          Register new users for Digital Evidence Vault system with role-based access.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="register"
          style={{ width: "80%", marginTop: "20px" }}
        />

        <p style={{ marginTop: "30px", fontSize: "14px" }}>
          Evidence Security | Chain of Custody | Tamper Detection
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label style={{ marginTop: "10px", display: "block", fontWeight: "600" }}>
            Select Role
          </label>

          <select
            className="w-full p-3 border rounded-lg mt-2 mb-4"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Police">Police Department</option>
            <option value="Forensic">Forensic Staff</option>
            <option value="Evidence">Evidence Room Staff</option>
          </select>

          <button className="login-btn" style={{ marginTop: "10px" }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>

    </div>

  </div>
);
}

export default Register;