import Marquee from "react-fast-marquee";

import img1 from '../../aseets/img1.avif';
import img2 from '../../aseets/img2.png';
import img3 from '../../aseets/img3.jpg';
import img4 from '../../aseets/img4.avif';
import img5 from '../../aseets/img5.jpg';
import img6 from '../../aseets/img6.jpg';
import img9 from '../../aseets/img9.avif';
import './textSlider.css';
const TextSlider = () => {
 

    return(

        <Marquee play={true} className="marquee" speed={80}>

<div>
  <img src={img1}/>  
</div>

<div>
  <img src={img2}/>  
</div>

<div>
  <img src={img3}/>  
</div>

<div>
  <img src={img4}/>  
</div>

<div>
  <img src={img5}/>  
</div>



<div>
  <img src={img6}/>  
</div>
<div>
  <img src={img9}/>  
</div>

        </Marquee>
    )

};




export default TextSlider;
