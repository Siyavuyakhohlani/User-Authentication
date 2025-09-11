// src/components/Auth.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const Auth = () => {
  const [authView, setAuthView] = useState('login'); // 'login', 'register', 'forgotPassword'

  const renderView = () => {
    switch (authView) {
      case 'register':
        return <Register onToggleForm={() => setAuthView('login')} />;
      case 'forgotPassword':
        return <ForgotPassword onBackToLogin={() => setAuthView('login')} onReset={() => setAuthView('Reset')} />;
      case 'login':
      default:
        return (
          <Login 
            onToggleForm={() => setAuthView('register')}
            onShowForgotPassword={() => setAuthView('forgotPassword')}
          />
        );
    }
  };

  return (
    <div className="auth-container">
      {renderView()}
    </div>
  );
};

export default Auth;