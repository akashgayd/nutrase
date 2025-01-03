import Course from "./course/couse";
import FitNessAsk from "./fitnessNutrician/fitnessN";
import Expert from "./expertIntuction/exprt";
import FoodFitness from "./foodFitness/foodFitness";
import AboutMain from "./about/about";
import Header from "../common/header/Header";
import Footer from "../common/Footer/footer";

function Home(){


    return(
       <>

       <Header/>
       <div>

<FitNessAsk/>
       </div>

       <div>

<Course/>



       </div>

       <div>
              <Expert/>
       </div>
       <div>
              <FoodFitness/>
       </div>
       <div>

              <AboutMain/>
       </div>
       <div>
<Footer/>
              
       </div>
     
       </>
    )


}
export default Home;