import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import HabitTracker from "./components/HabitTracker";
import GoogleLogin from "./components/GoogleLogin";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route
            path="/login"
            element={<GoogleLogin setUser={setUser} />}
          />
          <Route
            path="/"
            element={user ? <HabitTracker /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
