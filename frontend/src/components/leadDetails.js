import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { API_URL } from "../config";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "", source: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setLead(data);
        setEditData({ name: data.name, email: data.email, source: data.source });
      })
      .catch(err => console.error(err));
  }, [id]);

  const addNote = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/api/leads/${id}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ note })
    });
    setNote("");
    const res = await fetch(`${API_URL}/api/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = await res.json();
    setLead(updated);
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/api/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    });
    setEditing(false);
    const res = await fetch(`${API_URL}/api/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = await res.json();
    setLead(updated);
  };

  if (!lead) return <p className="text-center mt-4">Loading...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 className="mb-3 text-center">👤 Lead Details</h2>

        {/* Lead Info / Edit Form */}
        <div className="card p-3 shadow-sm mb-4">
          {editing ? (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  className="form-control"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  className="form-control"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Source</label>
                <input
                  className="form-control"
                  value={editData.source}
                  onChange={(e) => setEditData({ ...editData, source: e.target.value })}
                />
              </div>
              <button className="btn btn-success me-2" onClick={saveEdit}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Source:</strong> {lead.source}</p>
              <button className="btn btn-warning btn-sm" onClick={() => setEditing(true)}>Edit</button>
            </>
          )}
        </div>

        {/* Notes Section */}
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">📝 Notes</h5>
          <ul className="list-group mb-3">
            {lead.notes && lead.notes.map((n, i) => (
              <li key={i} className="list-group-item">{n}</li>
            ))}
          </ul>
          <textarea
            className="form-control mb-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
          />
          <button className="btn btn-primary w-100" onClick={addNote}>Add Note</button>
        </div>

        <Link to="/" className="btn btn-secondary mt-3 w-100">⬅ Back to Dashboard</Link>
      </div>
      <Footer />
    </>
  );
}

export default LeadDetails;
