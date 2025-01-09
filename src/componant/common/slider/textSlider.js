import Marquee from "react-fast-marquee";
import amazon from '../../../aseets/amazon.svg';
import acc from '../../../aseets/accencer.svg';
import airbus from '../../../aseets/airbus.svg';
import book from '../../../aseets/book.svg';
import cisco from '../../../aseets/cisco.svg';
import delied from '../../../aseets/delied.svg';
import disney from '../../../aseets/disney.svg';
import ey from '../../../aseets/ey.svg'

import "./textSlider.css";
const TextSlider = () => {
  return (
    <>
  
      <Marquee c play={true} speed={50}>
     <div className="marquee1">
<img src={amazon}/>
<img src={acc}/>
<img src={airbus}/>
<img src={book}/>
<img src={cisco}/>
<img src={delied}/>
<img src={disney}/>
<img src={ey}/>
<img src={amazon}/>
<img src={acc}/>
<img src={airbus}/>
<img src={book}/>
<img src={cisco}/>
<img src={delied}/>
<img src={disney}/>
<img src={ey}/>


</div>   
      </Marquee>
     
     
    </>
  );
};

export default TextSlider;
