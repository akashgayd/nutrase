import Home from './componant/home/home';

import { Routes,Route } from 'react-router-dom';
import ApiFetch from './componant/aiConponant/ai';
import Notfound from './componant/home/notFound/notFound';
import Blog from './componant/home/blog/blog';





import './App.css';
import Login from './Authorization/login/login';
import Register from './Authorization/signup/signup';
import ContactUs from './componant/home/contact/contactUs';


function App() {
 




  return (
  

    <Routes>
      
<Route path='/home' element ={<Home/>}></Route>
<Route path='/' element ={<Login/>}></Route>
<Route path='/signup' element ={<Register/>}></Route>
<Route path='/Dietplan' element ={<ApiFetch/>}></Route>
<Route path='/*' element ={<Notfound/>}></Route>
<Route path='/blog' element ={<Blog/>}></Route>

<Route path='/contact' element ={<ContactUs/>}></Route>





    </Routes>

  )
}

export default App;
