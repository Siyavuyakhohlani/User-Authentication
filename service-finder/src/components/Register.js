
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GoogleSignIn from './GoogleSignIn';


const Register = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    country: 'United States',
    phoneNumber: '+20',
    timezone: 'GMT+2',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      alert(error.message);
    }
  };


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
            <label htmlFor="firstName" className="input-label">First name</label>
            <input
              type="text"
              id="firstName"
              className="input-field"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName" className="input-label">Last name</label>
            <input
              type="text"
              id="lastName"
              className="input-field"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>


        {/* Email Address */}
        <div className="input-container">
          <label htmlFor="email" className="input-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>


        {/* Company Name */}
        <div className="input-container">
          <label htmlFor="Password" className="input-label">Password</label>
          <input
            type="text"
            id="password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>


        {/* Country & Phone Number - Side by Side */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-container">
            <label htmlFor="country" className="input-label">Select Country</label>
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
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber" className="input-label">Phone</label>
            <input
              type="tel"
              id="phoneNumber"
              className="input-field"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>


        {/* Default Timezone */}
        <div className="input-container">
          <label htmlFor="timezone" className="input-label">Default timezone</label>
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
        <button type="submit" className="btn btn-primary">
          SIGN UP
        </button>


        {/* Submit Button */}
        <button type="submit" className="btn btn-secondary">
          BACK TO LOGIN
        </button>




        {/* Login Link */}
        <p>
          Already have an account?{' '}
          <span className="auth-link" onClick={onToggleForm}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};


export default Register;
