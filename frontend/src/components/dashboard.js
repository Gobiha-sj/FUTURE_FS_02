import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { API_URL } from "../config";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setLeads(data);
        setError("");
      } else {
        setError(data.msg || "Failed to fetch leads");
        setLeads([]);
      }
    } catch {
      setError("Error connecting to backend");
    }
  };

  const deleteLead = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this lead?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.msg === "Lead deleted") fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        {/* Title + Add Lead Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">📊 Leads Overview</h2>
          <Link to="/add-lead" className="btn btn-success">
            ➕ Add Lead
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Card Grid */}
        <div className="row">
          {leads.map((lead) => (
            <div key={lead._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 lead-card">
                <div className="card-body">
                  <h5 className="card-title">{lead.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {lead.email} <br />
                    <strong>Source:</strong> {lead.source}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/lead/${lead._id}`} className="btn btn-info btn-sm">
                    View
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteLead(lead._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
