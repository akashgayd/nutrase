import './foodFitness.css';
import { Link } from 'react-router-dom';
import course1 from '../../../aseets/courses1.webp';
import course2 from '../../../aseets/courses2.webp';
import course3 from '../../../aseets/courses3.webp';
import course4 from '../../../aseets/courses4.webp';
import course5 from '../../../aseets/courses5.webp';
import course6 from '../../../aseets/courses6.webp';
import course7 from '../../../aseets/arrow.webp';
import TextSlider from '../../slider/textSlider';



const FoodFitness =()=>{

    return(


        <>
        
        <div className="main-food-fitness-cont">


<div className='heading-food-fiitness'>


<h1>Fitness & Nutrition Courses</h1>
<TextSlider/>



</div>

<div className='about-food-fitness'>


<div className='ask-ai-fitness'>
<img src={course1}/>

<br></br>
<Link to={'/chatbot'}>
<button> <img src={course7}/> </button></Link>
<h3>Expertise on Fitness, Nutrition and Health</h3>

</div>
<div className='ask-ai-fitness'>
<img src={course2}/>
<Link to={'/chatbot'}>
<button> <img src={course7}/> </button>
</Link>
<h3>Hacking exercise for health new science of fitness</h3>
  
</div>
<div className='ask-ai-fitness'>

<img src={course3}/>
<Link to={'/chatbot'}>
<button> <img src={course7}/></button></Link>
<h3>Designing Your Personal Weight Loss Plan</h3>
</div>
<div className='ask-ai-fitness'>


<img src={course4}/>
<Link to={'/chatbot'}>
<button> <img src={course7}/></button></Link>
<h3>Children Nutrition and Cooking</h3>
</div>
<div className='ask-ai-fitness'>

<img src={course5}/><Link to={'/chatbot'}>

<button> <img src={course7}/></button></Link>
<h3>Introduction to Food and Health.</h3>
</div>
<div className='ask-ai-fitness'>

<img src={course6}/>
<Link to={'/chatbot'}>
<button> <img src={course7}/></button></Link>
<h3>Nutrition and Lifestyle </h3>

</div>




</div>

        </div>
        
        </>

    )

}
export default FoodFitness;