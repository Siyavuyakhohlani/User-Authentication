import React, { useState, useEffect } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const EmailVerification = () => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Send verification email automatically when component mounts
  useEffect(() => {
    if (currentUser && !currentUser.emailVerified && !emailSent) {
      sendVerificationEmail();
    }
  }, [currentUser, emailSent]);

  const sendVerificationEmail = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      // Check if user is properly authenticated
      if (!currentUser) {
        throw new Error("No user is currently signed in");
      }

      // Check if email is already verified
      if (currentUser.emailVerified) {
        setMessage("Your email is already verified!");
        return;
      }

      // Send the verification email
      await sendEmailVerification(currentUser);
      setMessage("Verification email sent! Please check your inbox (and spam folder).");
      setEmailSent(true);
      
    } catch (error) {
      console.error("Verification error:", error);
      setError("Error sending verification email: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    await sendVerificationEmail();
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      setError("Error signing out: " + error.message);
    }
  };

  // Add a refresh button to check verification status
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h2>Verify Your Email Address</h2>
        <div className="verification-icon">📧</div>

        <p className="verification-text">
          We've sent a verification email to: <br />
          <strong>{currentUser?.email}</strong>
        </p>

        {currentUser?.emailVerified ? (
          <div className="verified-message">
            <p className="success">✅ Your email has been verified!</p>
            <button onClick={handleRefresh} className="refresh-btn">
              Continue to App
            </button>
          </div>
        ) : (
          <>
            <p className="verification-instructions">
              Please check your inbox and click the verification link to activate
              your account.
            </p>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            <div className="verification-actions">
              <button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="resend-btn"
              >
                {isLoading ? "Sending..." : "Resend Verification Email"}
              </button>

              <button onClick={handleSignOut} className="logout-btn">
                Sign Out
              </button>

              <button onClick={handleRefresh} className="refresh-btn">
                I've Verified My Email
              </button>
            </div>

            <div className="verification-tips">
              <h4>Didn't receive the email?</h4>
              <ul>
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes - sometimes emails are delayed</li>
                <li>Try resending the verification email</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;