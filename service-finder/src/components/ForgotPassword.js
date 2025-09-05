// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import './ForgotPassword.css';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox (and spam folder).');
      setEmail('');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Error sending reset email: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <p className="forgot-password-instructions">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {message && (
        <div className="success-message">
          <p className="success">{message}</p>
          <p className="success-note">
            If you don't see the email, please check your spam folder.
          </p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleResetPassword} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="btn-group">
        <button type="button" className="the-next-btn">
          NEXT ➔
        </button>
        <button type="button" className="the-bck2lgn-btn">
          Back to login
        </button>
      </div>

      <p className="back-to-login">
        <span className="auth-link" onClick={onBackToLogin}>
          ← Back to Login
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;