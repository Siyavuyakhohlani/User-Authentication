import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import GoogleSignIn from './GoogleSignIn'; // Import Google authentication component
const Register = ({ onToggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  // List of countries
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
    'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Cambodia',
    'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia',
    'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt',
    'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece',
    'Guatemala', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania',
    'Luxembourg', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Panama', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia',
    'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa',
    'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand',
    'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Uruguay', 'Venezuela', 'Vietnam'
  ];
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Form validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    // Phone number validation (basic)
    // eslint-disable-next-line no-useless-escape
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    // eslint-disable-next-line no-useless-escape
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-()]/g, ''))) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Update user profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      // Try to save additional user data to Firestore
      try {
        const userData = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          country: country || null,
          createdAt: new Date(),
          authProvider: 'email'
        };
        await setDoc(doc(db, 'users', user.uid), userData);
        console.log('User data saved to Firestore successfully');
      } catch (firestoreError) {
        console.warn('Failed to save user data to Firestore:', firestoreError.message);
        console.warn('User registration was successful, but user data could not be saved. This may be due to Firestore security rules.');
        // Don't fail registration - user account was created successfully
      }
      console.log('User registered successfully:', user);
      // User is now registered and logged in
    } catch (error) {
      console.error('Registration error:', error);
      // Handle specific Firebase Auth errors
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already registered. Please try logging in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <GoogleSignIn />
      <div className="divider">
        <span>or</span>
      </div>
      <form onSubmit={handleRegister}>
        <div className="name-row">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="half-width"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="half-width"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number (e.g., +1234567890)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* Country Selection */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="country-select"
        >
          <option value="">Select Country (Optional)</option>
          {countries.map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Creating Account...' : 'Register with Email'}
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span className="auth-link" onClick={onToggleForm}>
          Login here
        </span>
      </p>
    </div>
  );
};
export default Register;
