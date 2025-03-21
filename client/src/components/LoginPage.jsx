// src/components/LoginPage.jsx
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'; // Ensure you have the correct CSS path

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in:', result.user);
      setIsLoggedIn(true);
      navigate('/tracker');  // Redirect to habit tracker page
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
      alert("Failed to log in with Google!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="google-login-container">
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
