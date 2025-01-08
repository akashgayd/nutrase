import './fitnessN.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth

const FitNessAsk = () => {
  const navigate = useNavigate();
  const [user, setUser ] = useState(null); // State to hold user authentication status
  const auth = getAuth(); // Initialize Firebase Auth

  // Check user authentication status on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser (user); // User is signed in
      } else {
        setUser (null); // User is signed out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  // Function to handle navigation
  function handleNavigate() {
    if (user) {
      navigate('/Dietplan'); // Navigate to Dietplan if user is authenticated
    } else {
      navigate('/Signup'); // Redirect to Signup page if user is not authenticated
    }
  }

  return (
    <>
      <div className="main-cont-fitness">
        <div className="heading-part">
          <p className="st-para">FITNESS & NUTRITION</p>
          <h1>This Life Style For Your <span> Fitness Not</span> Only Diet.</h1>
          <p className="last-para-head">It has Survived Not Only Five Centuries But Also</p>
          <button className='btn-grad' onClick={handleNavigate}>Ask To Nutras</button>
        </div>
      </div>
    </>
  );
};

export default FitNessAsk;