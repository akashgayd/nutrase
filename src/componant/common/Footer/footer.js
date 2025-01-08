import { useNavigate } from "react-router-dom";
import "./footer.css";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Footer = () => {
  const navigate = useNavigate();
  function blog() {
    navigate("/blog");
  }
  function contact() {
    navigate("/contact");
  }
  function home() {
    navigate("/home");
  }

  function about() {
    navigate("/about");
  }



  

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
    <>

    <div className="footer-main-cont">
      <div className="footer-container">
        <div className="footer-left-content">
          <h1 className="footer-heading">NUTRAS</h1>
          <br/>
          <p className="footer-sub-para">This Life Style For Your Fitness Not Only Diet.</p>
          <br/>
          <button className="footer-button" onClick={handleNavigate}>Try Nutras</button>
        </div>
    
        <div className="footer-right-content">
          <ul className="footer-category-list">
            <li className="footer-category-list-items main-item-heading">Nav Links</li>
            <li className="footer-category-list-items" onClick={home}>Home</li>
            <li className="footer-category-list-items" onClick={about}>About</li>
            <li className="footer-category-list-items" onClick={blog}>Blogs</li>
            <li className="footer-category-list-items" onClick={contact}>Contact</li>
          </ul>
          <ul className="footer-category-list">
            <li className="footer-category-list-items main-item-heading">Help Links</li>
            <li className="footer-category-list-items">Privacy Policy</li>
            <li className="footer-category-list-items">Discussion</li>
            <li className="footer-category-list-items">Terms & Conditions</li>
            <li className="footer-category-list-items">Customer Support</li>
            <li className="footer-category-list-items">Course FAQ,s</li>
            <li className="footer-category-list-items">Online Classes</li>
          </ul>
          <ul className="footer-category-list">
            <li className="footer-category-list-items main-item-heading">Fitness Related</li>
            <li className="footer-category-list-items">Daily Exercise</li>
            <li className="footer-category-list-items">Find Your Balance</li>
            <li className="footer-category-list-items">Personal Program</li>
            <li className="footer-category-list-items">Natural Process</li>
            <li className="footer-category-list-items">Immune System</li>
          </ul>
        </div>
      </div>
      <br/>
      <div className="footer-bottom-part">
      © 2023 Nutras Made with Terms of Service * Privacy Policy * Sitemap * Security
      </div>
    </div>
    </>
  );
};

export default Footer;
