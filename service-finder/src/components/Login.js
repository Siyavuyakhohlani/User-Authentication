// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GoogleSignIn from './GoogleSignIn'; // Import the Google component
import './Login.css';

const Login = ({ onToggleForm, onShowForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign in</h2>
      {error && <p className="error">{error}</p>}

      {/* Google Sign-In - add specific class */}
      <GoogleSignIn className="google-signin-button" />

      <div className="divider">
        <span>or</span>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Apply custom class to login button */}
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>

      <p className="forgot-password-link">
        <span onClick={onShowForgotPassword}>
          Forgot your password?
        </span>
      </p>

      <button type="button" className="btn btn-black">
        CREATE NEW ACCOUNT
        <span className="beta-badge">Beta</span>
      </button>

      <p>
        Don't have an account?{' '}
        <span className="auth-link" onClick={onToggleForm}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;