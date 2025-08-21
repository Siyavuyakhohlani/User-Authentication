// src/components/GoogleSignIn.js
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const GoogleSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Optional: Add custom parameters
      provider.setCustomParameters({
        prompt: "select_account"
      });
      
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      GoogleAuthProvider.credentialFromResult(result);
      // Remove unused token variable: const token = credential.accessToken;
      
      // The signed-in user info
      const user = result.user;
      
      console.log('Google sign-in successful:', user);
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Handle errors here
      // Remove unused variables:
      // const errorCode = error.code;
      const errorMessage = error.message;
      // Remove unused email variable: const email = error.customData?.email;
      // Remove unused credential variable: const credential = GoogleAuthProvider.credentialFromError(error);
      
      alert(`Google sign-in failed: ${errorMessage}`);
    }
  };

  return (
    <div className="google-signin-container">
      <button 
        onClick={signInWithGoogle} 
        className="google-signin-btn"
        type="button"
      >
        <img 
          src="https://developers.google.com/identity/images/g-logo.png" 
          alt="Google logo" 
          className="google-logo"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;