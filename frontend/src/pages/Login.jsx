import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock, FaEye, FaShieldAlt } from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("currentUser", user.name);

        if (user.role === "Admin") navigate("/admin");
        else if (user.role === "Police") navigate("/dashboard");
        else if (user.role === "Forensic") navigate("/verify");
        else if (user.role === "Evidence") navigate("/evidence");
      } else {
        alert("Invalid Email or Password");
      }

      setLoading(false);
    }, 1200);
  };

  return (
  <div className="login-bg flex items-center justify-center">

    <div className="split-container">

      {/* LEFT SIDE */}
      <div className="left-panel">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="mb-6">
          Log in to your account to continue your Digital Evidence Vault journey.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="illustration"
          style={{ width: "80%", marginTop: "20px" }}
        />

        <p style={{ marginTop: "30px", fontSize: "14px" }}>
          Privacy Policy | Terms of Service | Help
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">
        <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ textAlign: "right", fontSize: "14px", color: "blue" }}>
            Forgot Password?
          </div>

          <button className="login-btn">Log In</button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#2563eb" }}>
            Sign Up
          </Link>
        </p>
      </div>

    </div>

  </div>
);
}

export default Login;