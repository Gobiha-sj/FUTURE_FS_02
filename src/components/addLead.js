import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AddLead() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");   // ✅ New notes field
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, source, notes: notes ? [notes] : [] }) // ✅ send notes array
      });

      if (res.ok) {
        setMessage("✅ Lead added successfully!");
        setName("");
        setEmail("");
        setSource("");
        setNotes("");
        // Optional: redirect back to dashboard after success
        setTimeout(() => navigate("/"), 1500);
      } else {
        const data = await res.json();
        setMessage(`❌ Error: ${data.msg || "Failed to add lead"}`);
      }
    } catch (err) {
      setMessage("❌ Error connecting to backend");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">➕ Add New Lead</h2>
        <div className="card shadow-sm p-4">
          {message && (
            <div
              className={`alert ${
                message.startsWith("✅") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter lead name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter lead email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Source</label>
              <select
                className="form-select"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* ✅ Notes field */}
            <div className="mb-3">
              <label className="form-label fw-bold">Notes</label>
              <textarea
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add initial notes..."
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Add Lead
            </button>
          </form>

          {/* Back to Dashboard Button */}
          <Link to="/" className="btn btn-secondary w-100">
            ⬅ Back to Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddLead;
