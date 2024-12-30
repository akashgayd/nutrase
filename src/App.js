import Home from './componant/home/home';

import { Routes,Route } from 'react-router-dom';
import Aisupoort from './componant/aisuport/aiSupoort';
import Notfound from './componant/notFound/notFound';
import Course from './componant/home/course/couse';
import './App.css';


function App() {
 


  return (
  

    <Routes>
<Route path='/' element ={<Home/>}></Route>
<Route path='/chatbot' element ={<Aisupoort/>}></Route>
<Route path='/*' element ={<Notfound/>}></Route>
<Route path='/Cours' element ={<Course/>}></Route>


    </Routes>

  )
}

export default App;
