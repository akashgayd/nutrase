import Home from './componant/home/home';
import { Routes, Route, Navigate } from 'react-router-dom';
import ApiFetch from './componant/aiConponant/ai';
import Notfound from './componant/home/notFound/notFound';
import Blog from './componant/home/blog/blog';
import AboutPage from './componant/pages/aboutPage/aboutPage';
import './App.css';
import Login from './Authorization/login/login';
import Register from './Authorization/signup/signup';
import ContactUs from './componant/home/contact/contactUs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Initialize Firebase Authentication
const auth = getAuth();

// Custom ProtectedRoute component
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) {
    return <Navigate to="/signup" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Default route redirects to /home */}
      <Route path="/" element={<Navigate to="/home" />} />
      
      {/* Home page accessible without login */}
      <Route path="/home" element={<Home />} />
      
      {/* Login and Signup routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      
      {/* Protected Dietplan route */}
      <Route
        path="/Dietplan"
        element={
          <ProtectedRoute>
            <ApiFetch />
          </ProtectedRoute>
        }
      />
      
      {/* Other routes */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* 404 Not Found route */}
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
}

export default App;