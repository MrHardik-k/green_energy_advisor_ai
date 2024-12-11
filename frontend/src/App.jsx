import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send the token to the backend
      const response = await fetch("http://localhost:5000/api/auth/singin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in.");
        setUser(currentUser);
      } else {
        console.log("User is logged out");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google Sign-In Authentication</h1>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <img
            src={user.photoURL}
            alt="Profile"
            style={{ borderRadius: "50%" }}
          />
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            style={{ padding: "10px 20px", marginTop: "20px" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
