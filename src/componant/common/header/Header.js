import "./Header.css";
import { useState } from "react";
import logo from '../../../aseets/logo3.jpg'
import React, { useEffect } from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const [model, setmodel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
        navigate("/"); // Redirect to home page if user is not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false); // Update state to reflect logged out status
        navigate("/"); // Redirect to home page after logout
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function blog() {
    navigate("/blog");
  }
  function contact() {
    navigate("/contact");
  }
  function home() {
    navigate("/");
  }

  function about() {
    navigate("/about");
  }

  const Logbtn = () => {
    return (
      <>
        <div className="log-model">
          <p>Are you sure to logout</p>
          <div>
            <button onClick={handleSignOut} style={{ backgroundColor: "red" }}>logout</button>
            <button onClick={() => setmodel(false)}>cancel</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="main-header-cont">
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top main-nav-list">
          <div className="container-fluid main-nav-list">
            <a className="navbar-brand" href="#">
              <img
                alt="Logo"
                className="d-inline-block align-text-top nav-img"
                src={logo}
                onClick={home}
              ></img>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse header-nav" id="navbarNav">
              <ul className="navbar-nav me-auto ms-4 custom-nav nav-all-list">
                <li className="nav-item" onClick={about}>
                  <a className="nav-link">About</a>
                </li>
                <li className="nav-item" onClick={blog}>
                  <a className="nav-link">Blogs</a>
                </li>
                <li className="nav-item" onClick={contact}>
                  <a className="nav-link">Contact</a>
                </li>
              </ul>

              <div className="togglelogoubtn">
                {isLoggedIn ? (
                  <button
                    className="btn btn-outline-danger"
                    type="submit"
                    onClick={() => setmodel(true)}
                  >
                    <FiLogOut className="logout-btn-icon"></FiLogOut>
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                )}
                <div>{model && <Logbtn />}</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;