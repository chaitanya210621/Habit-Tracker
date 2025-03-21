import React from "react";
import { auth, provider, logout } from "../firebaseConfig";  // ✅ Import logout function
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css";

const GoogleLogin = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="google-login-container">
      <h1>Login with Google</h1>
      <button className="btn btn-primary" onClick={handleLogin}>
        Sign In with Google
      </button>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default GoogleLogin;
