// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GoogleSignIn from './GoogleSignIn';
import LoadingSpinner from "./LoadingSpinner"; // ✅ import spinner

const Register = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    country: 'United States',
    phoneNumber: '+1', // Default dialing code for United States
    timezone: 'GMT+2',
    password: '',
    confirmPassword: '', // Added confirm password field
  });

  const [loading, setLoading] = useState(false); // ✅ new state

  // Map of countries to their international dialing codes
  const countryCodes = {
    'United States': '+1',
    'Canada': '+1',
    'UK': '+44',
    'South Africa': '+27',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const dialingCode = value.match(/^\+\d+/);
      const remainingNumber = value.replace(/^\+\d+/, '');
      setFormData((prev) => ({
        ...prev,
        phoneNumber: dialingCode ? `${dialingCode}${remainingNumber}` : value,
      }));
    } else if (name === 'country') {
      const dialingCode = countryCodes[value];
      setFormData((prev) => ({
        ...prev,
        country: value,
        phoneNumber: dialingCode,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ show spinner

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // ✅ hide spinner when done
    }
  };

  // ✅ show spinner while loading
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="auth-form">
      <h2>Sign up to serviceFinder</h2>

      {/* Google Sign-in */}
      <GoogleSignIn />

      <div className="divider">
        <span>or</span>
      </div>

      <form onSubmit={handleRegister}>
        {/* First Name & Last Name - Side by Side */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-container">
            <input
              type="text"
              id="firstName"
              className="input-field"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="First Name"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              id="lastName"
              className="input-field"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="input-container">
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="input-container">
          <label htmlFor="confirmPassword" className="input-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
            placeholder="Confirm your password"
          />
        </div>

        {/* Country & Phone Number - Side by Side */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-container">
            <label htmlFor="country" className="input-label">
              Select Country
            </label>
            <select
              id="country"
              className="input-field"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber" className="input-label">
              Phone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="input-field"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Default Timezone */}
        <div className="input-container">
          <label htmlFor="timezone" className="input-label">
            Default timezone
          </label>
          <select
            id="timezone"
            className="input-field"
            name="timezone"
            value={formData.timezone}
            onChange={handleInputChange}
            required
          >
            <option value="GMT+2">GMT+2</option>
            <option value="GMT+1">GMT+1</option>
            <option value="GMT+3">GMT+3</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-dark">
          SIGN UP
        </button>

        {/* Back to Login Button */}
        <button type="button" className="btn btn-secondary" onClick={onToggleForm}>
          BACK TO LOGIN
        </button>
      </form>
    </div>
  );
};

export default Register;
