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

  // return (
  //   <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
  //     <h1>Google Sign-In Authentication</h1>
  //     {user ? (
  //       <div>
  //         <h3>Welcome, {user.displayName}</h3>
  //         <img
  //           src={user.photoURL}
  //           alt="Profile"
  //           style={{ borderRadius: "50%" }}
  //         />
  //         <p>Email: {user.email}</p>
  //         <button
  //           onClick={handleLogout}
  //           style={{ padding: "10px 20px", marginTop: "20px" }}
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     ) : (
  //       <button
  //         onClick={handleGoogleSignIn}
  //         style={{ padding: "10px 20px", marginTop: "20px" }}
  //       >
  //         Login with Google
  //       </button>
  //     )}
  //   </div>
  // );

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <a
          href="index.html"
          className="navbar-brand d-flex align-items-center border-end px-4 px-lg-3"
        >
          <h2 className="m-0 text-primary">Radient Future Ai</h2>
        </a>
        <button
          type="button"
          className="navbar-toggler me-2"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <a href="index.html" className="nav-item nav-link active">
              Home
            </a>
            <a href="about.html" className="nav-item nav-link">
              About
            </a>
            <a href="service.html" className="nav-item nav-link">
              Service
            </a>
            <a href="project.html" className="nav-item nav-link">
              Solar Solutions
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu bg-light m-0">
                <a href="feature.html" className="dropdown-item">
                  Feature
                </a>
                <a href="quote.html" className="dropdown-item">
                  Stay Updated
                </a>
                <a href="team.html" className="dropdown-item">
                  Our Team
                </a>
                <a href="testimonial.html" className="dropdown-item">
                  Testimonial
                </a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>
          <a
            href=""
            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
          >
            Try it Now<i className="fa fa-arrow-right ms-3"></i>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default App;
