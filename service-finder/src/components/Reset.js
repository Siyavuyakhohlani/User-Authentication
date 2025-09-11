// src/components/Reset.js
import React, { useState } from 'react';

import './ForgotPassword.css';
import LoadingSpinner from './LoadingSpinner'; // ✅ import spinner

const Reset = ({ onBackToLogin }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true); // ✅ show spinner
    setError('');
    setMessage('');

    try {
      // Example: await verifyPasswordResetCode(auth, emailOrCode); 
      // Replace with actual Firebase logic if needed
      setMessage('Password reset successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Error resetting password: ' + error.message);
      }
    } finally {
      setIsLoading(false); // ✅ hide spinner
    }
  };

  // ✅ show spinner while loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <p className="forgot-password-instructions">
        Enter your new password.
      </p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleResetPassword} className="forgot-password-form">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          Save Password
        </button>
      </form>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={onBackToLogin}
      >
        BACK TO LOGIN
      </button>
    </div>
  );
};

export default Reset;
