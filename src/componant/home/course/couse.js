import React from "react";
import "./couse.css";
import Women from "../../../aseets/run-women-png.png";
import Lotus from "../../../aseets/lotus-png.webp";
import Man from "../../../aseets/man-png.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const MainCourse = () => {


  const navigate = useNavigate();

  

  // state to check and hold the user is auorized aur not

  const [user, setUser ] = useState(null); 

  // Initialize Firebase Auth to firebase
  const auth = getAuth();

  // Check user authentication status on component mount using useEffect 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        // user signin success
        setUser (user); 
      } else {
        setUser (null); 
        // user can be signOut
      }
    });

    return () => unsubscribe(); 
  }, [auth]);

  // Function to handle navigation user is Authorised user can be navigate to the dietplan not authori navigate signup
  function handleNavigate() {
    if (user) {
      navigate('/Dietplan'); // Navigate to Dietplan if user is authenticated
    } else {
      navigate('/Signup'); // Redirect to Signup page if user is not authenticated
    }
  }



  return (
    <div className="Main-course-Cont">
      <div className="main-course-card-cont">
        <div className="main-course-cards">
          <img src={Women} className="course-card-images" />
          <br />
          <p className="course-card-heading">Women's Fitness</p>
          <br />
          <p className="course-card-para">
            This is for informational purposes only. For medical advice or
            diagnosis, consult a professional. Generative AI is experimental.
          </p>
          <br/>
          <button className="course-card-btn" onClick={handleNavigate}>Ask Nutras <FaArrowRight></FaArrowRight></button>
        </div>
        <div className="main-course-cards">
          <img src={Lotus} className="course-card-images" />
          <br />
          <p className="course-card-heading"> Ask Anythink...</p>
          <br />
          <p className="course-card-para">
            This is for informational purposes only. For medical advice or
            diagnosis, consult a professional. Generative AI is experimental.
          </p>
          <br />
          <button className="course-card-btn" onClick={handleNavigate}>Ask Nutras <FaArrowRight></FaArrowRight></button>
        </div>
        <div className="main-course-cards">
          <img src={Man} className="course-card-images" />
          <br />
          <p className="course-card-heading">Men's Fitness</p>
          <br />
          <p className="course-card-para">
            This is for informational purposes only. For medical advice or
            diagnosis, consult a professional. Generative AI is experimental.
          </p>
          <br/>
          <button className="course-card-btn" onClick={handleNavigate}>Ask Nutras <FaArrowRight></FaArrowRight></button>
        </div>
      </div>
    </div>
  );
};

export default MainCourse;