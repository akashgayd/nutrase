
import Women from '../../../aseets/run-women-png.png';
import Lotus from '../../../aseets/lotus-png.webp';
import Man from '../../../aseets/man-png.png';
import './couse.css';

const Course = ()=>{



    return(
       

        <div className='main-course-cont'>


<div className='course-1'>


<div className='girl-run'>
<img src={Women}/> 

</div>
<div className='course-dis'>

<h1> Women Course</h1>

<p>This is for informational purposes only. For medical advice or diagnosis, consult a professional. Generative AI is experimental.</p>

</div>


</div>




<div className='course-1'>

<div className='lotus'>
<img src={Lotus}/>
</div>

<div className='course-dis'>



<h1> Ask Anythink...</h1>

<p>This is for informational purposes only. For medical advice or diagnosis, consult a professional. Generative AI is experimental.</p>



</div>


</div>

<div className='course-1'>


<div className='man-using-lap'>

<img src={Man}/>


</div>
<div className='course-dis'>



<h1>Men's Course</h1>

<p>This is for informational purposes only. For medical advice or diagnosis, consult a professional. Generative AI is experimental.</p>



</div>

</div>

        </div>

    )

}
export  default Course;