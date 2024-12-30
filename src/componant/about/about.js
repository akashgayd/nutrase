import './about.css';
import shape1 from '../../aseets/shape1.webp';
import shape2 from '../../aseets/shape2.webp';

const About = ()=>{

    return(

        <div className='main-about-cont'>







<div className='img-leaf'>

    <img src={shape1}/>
</div>
<div className='costo-heading'>

<p>Happy Customer</p>
<h1>What Client Say About Us</h1>

<h3>systems learn and improve by being exposed to large amounts of data, where they identify patterns and relationships that humans may not notice. AI uses algorithms, which are sets of rules or instructions, to guide its analysis and decision-making. 
</h3>
</div>
<div className='img-leaf2'>

<img src={shape2}/>


</div>
<div className='costomer-feedback'></div>



        </div>
    )
}
export default About;