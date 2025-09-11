// src/App.js
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'; // Import Footer
import LoadingSpinner from './components/LoadingSpinner'; // Import LoadingSpinner
import './App.css';

function AppContent() {
  const { currentUser, loading } = useAuth(); // Get both currentUser and loading

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner /> {/* Show the spinner while loading */}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {currentUser ? <Dashboard /> : <Auth />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App-container">
        <AppContent />
        <Footer /> {/* Globally visible footer */}
      </div>
    </AuthProvider>
  );
}

export default App;