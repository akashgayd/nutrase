import Home from './componant/home/home';

import { Routes,Route } from 'react-router-dom';
import ApiFetch from './componant/aiConponant/ai';
import Notfound from './componant/home/notFound/notFound';
import Course from './componant/home/course/couse';

import './App.css';


function App() {
 


  return (
  

    <Routes>
      
<Route path='/' element ={<Home/>}></Route>
<Route path='/Dietplan' element ={<ApiFetch/>}></Route>
<Route path='/*' element ={<Notfound/>}></Route>
<Route path='/Cours' element ={<Course/>}></Route>


    </Routes>

  )
}

export default App;
