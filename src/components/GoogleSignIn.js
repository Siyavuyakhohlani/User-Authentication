// src/components/GoogleSignIn.js
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
      
      // Try to save user data to Firestore (but don't fail authentication if this fails)
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          // Extract name from display name
          const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          // Save user data to Firestore
          await setDoc(userDocRef, {
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            phoneNumber: user.phoneNumber || '',
            createdAt: new Date(),
            authProvider: 'google',
            profilePicture: user.photoURL || ''
          });
          
          console.log('User data saved to Firestore successfully');
        }
      } catch (firestoreError) {
        console.warn('Failed to save user data to Firestore:', firestoreError.message);
        console.warn('User authentication was successful, but user data could not be saved. This may be due to Firestore security rules.');
        // Don't throw error - authentication was successful
      }
      
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
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;