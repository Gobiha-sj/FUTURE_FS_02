import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">CRM</Link>
        <div>
          <Link className="nav-link d-inline text-white me-3" to="/">Dashboard</Link>
          <Link className="nav-link d-inline text-white me-3" to="/add-lead">Add Lead</Link>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
