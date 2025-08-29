// src/components/ServiceSuggestion.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const ServiceSuggestion = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    type: 'clinic',
    address: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Add the suggestion to Firestore
      await addDoc(collection(db, 'suggestions'), {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
        status: 'pending' // pending, approved, rejected
      });

      setMessage('Suggestion submitted successfully! Thank you!');
      setFormData({
        name: '',
        type: 'clinic',
        address: '',
        description: ''
      });
    } catch (error) {
      setMessage('Error submitting suggestion: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-suggestion">
      <h2>Suggest a New Service</h2>
      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="form-group">
          <label htmlFor="name">Service Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Community Health Clinic"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Service Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="clinic">Clinic</option>
            <option value="library">Library</option>
            <option value="shelter">Shelter</option>
            <option value="community-center">Community Center</option>
            <option value="food-bank">Food Bank</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Full address including street, city, and postal code"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Optional: Describe the services offered, hours, contact info, etc."
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
        </button>

        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      </form>
    </div>
  );
};

export default ServiceSuggestion;