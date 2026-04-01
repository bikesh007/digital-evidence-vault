import { useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const handleLogout = () => {
    let logs = JSON.parse(localStorage.getItem("logs")) || [];

    logs.push({
      action: "User Logged Out",
      user: user,
      role: role,
      fileName: "-",
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("logs", JSON.stringify(logs));

    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>{role} Dashboard</h2>

      <div className="nav-right">
        <span>👤 {user} ({role})</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;