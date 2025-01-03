import "./foodFitness.css";
import { Link } from "react-router-dom";
import course1 from "../../../aseets/courses1.webp";
import course2 from "../../../aseets/courses2.webp";
import course3 from "../../../aseets/courses3.webp";
import course7 from "../../../aseets/arrow.webp";
import TextSlider from "../../common/slider/textSlider";
import { useNavigate } from "react-router-dom";

const FoodFitness = () => {

 const navigate = useNavigate();
  function blog(){

    navigate("/blog")
    }


  return (
    <>
      <div className="main-food-fitness-cont">
        <div className="heading-food-fiitness">
          <h1>Fitness & Nutrition</h1>
          <br/>
          <TextSlider />
        </div>
        <br/>
        <div className="about-food-fitness">
          <div className="food-fitness-card">
          <div className="ask-ai-fitness">
            <img src={course1} className="ai-fitness-img" onClick={blog}></img>
            <h3 className="ai-fitness-text">Expertise on Fitness, Nutrition and Health</h3>
          </div>
          <div className="ask-ai-fitness" onClick={blog}>
            <img src={course2}  className="ai-fitness-img"/>

            <h3 className="ai-fitness-text">Hacking exercise for health new science of fitness</h3>
          </div>
          <div className="ask-ai-fitness" onClick={blog}>
            <img src={course3}  className="ai-fitness-img"/>
            <h3 className="ai-fitness-text">Designing Your Personal Weight Loss Plan</h3>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FoodFitness;