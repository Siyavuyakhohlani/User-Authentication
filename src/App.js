import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import EmailVerification from './components/EmailVerification';
import './App.css';

function AppContent() {
  const { currentUser, isEmailVerified } = useAuth();

  // Show email verification page if user is logged in but not verified
  if (currentUser && !isEmailVerified) {
    return <EmailVerification />;
  }

  // Show dashboard if user is logged in and verified
  if (currentUser && isEmailVerified) {
    return <Dashboard />;
  }

  // Show auth pages if user is not logged in
  return <Auth />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;