import './fitnessN.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
const FitNessAsk = () => {
    const navigate = useNavigate();


    // state to check and hold the user is Authorized or not

    const [user, setUser] = useState(null);

    // Initialize Firebase Auth to firebase
    const auth = getAuth();

    // Check user authentication status on component mount using useEffect 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                // user signin success
                setUser(user);
            } else {
                setUser(null);
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