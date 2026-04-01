import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const menuItem = (path, name, icon) => (
    <Link
      to={path}
      className={`menu-item ${
        location.pathname === path ? "active" : ""
      }`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </Link>
  );

  return (
    <div className="sidebar">
      <div>
        <h1 className="logo">🛡 Digital Evidence Vault</h1>

        <div className="menu">
          {role === "Admin" && (
            <>
              {menuItem("/admin", "Dashboard", "📊")}
              {menuItem("/logs", "Audit Logs", "📄")}
            </>
          )}

          {role === "Police" && (
            <>
              {menuItem("/dashboard", "Dashboard", "📊")}
              {menuItem("/upload", "Upload Evidence", "⬆")}
            </>
          )}

          {role === "Forensic" && (
            <>
              {menuItem("/verify", "Verify Evidence", "✔")}
            </>
          )}

          {role === "Evidence" && (
            <>
              {menuItem("/evidence", "Evidence Room", "📁")}
            </>
          )}
        </div>
      </div>

      <Link to="/" className="logout">
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;