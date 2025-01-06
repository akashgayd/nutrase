import Marquee from "react-fast-marquee";
import fit1 from '../../../aseets/fit1.jpg';
import fit2 from '../../../aseets/fit2.jpg';
import fit3 from '../../../aseets/fit3.jpg';
import fit4 from '../../../aseets/fit4.jpg';
import fit5 from '../../../aseets/fit5.jpg';
import fit6 from '../../../aseets/fit6.jpg';
import "./textSlider.css";
const TextSlider = () => {
  return (
    <Marquee play={true} className="marquee" speed={70}>
      <img src={fit6} className="img-logo-width br"/>
      <img src={fit1} className="img-logo-width"/>
      <img src={fit3} className="img-logo-width logo-ht-wt"/>
      <img src={fit2} className="img-logo-width"/>
      <img src={fit4} className="img-logo-width ht-wt"/>
      <img src={fit1} className="img-logo-width"/>
      <img src={fit5} className="img-logo-width ht"/>
      <img src={fit4} className="img-logo-width ht-wt"/>
      <img src={fit2} className="img-logo-width"/>
      <div className="brands-logo">Fitness Brands</div>
    </Marquee>
  );
};

export default TextSlider;
