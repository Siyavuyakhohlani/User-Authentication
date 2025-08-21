// src/components/Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ServiceSuggestion from './ServiceSuggestion';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {currentUser.email}!</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>
      
      <ServiceSuggestion />
      
      {/* You can add more dashboard content here later */}
    </div>
  );
};

export default Dashboard;