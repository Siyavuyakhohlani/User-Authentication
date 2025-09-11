// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ServiceSuggestion from "./ServiceSuggestion";
import LoadingSpinner from "./LoadingSpinner"; // ✅ corrected path

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {currentUser?.email}!</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </header>

      <ServiceSuggestion />
    </div>
  );
};

export default Dashboard;
