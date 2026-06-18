import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AddLead from "./components/addLead";
import LeadDetails from "./components/leadDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
        </Routes>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;
