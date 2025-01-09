import Marquee from "react-fast-marquee";


import "./textSlider.css";
const TextSlider = () => {
  return (
    <>
    
      <Marquee play={true} className="marquee" speed={70} >
        <div className="main-marque-cont">
        <div className="text2">
        "Limited-Time Offer: Get 30% Off on All Fitness Plans
        </div>
        <div className="text1">
        Transform Your Fitness Journey Today!
        </div>
        <div className="text2">
        Exclusive Fitness Tips and Workouts
        </div>
        <div className="text1">
        "Limited-Time Offer: Get 30% Off on All Fitness Plans
        </div>
       
       
        
        </div>
      
      </Marquee>
     
    </>
  );
};

export default TextSlider;
