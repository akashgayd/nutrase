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
      
      {/* Other routes */}
      <Route path="/Dietplan" element={<ApiFetch />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* 404 Not Found route */}
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
}

export default App;