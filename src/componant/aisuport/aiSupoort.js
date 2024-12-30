
import ApiFetch from "../aiConponant/ai";
import { useState } from "react";

const Aisupoort = ()=>{
const[inputvalue,setinputvalue]= useState({
    gender:"",
    age:"",
    weight:"",
    targetWeight:"",
    targetDays:""
})
    return(

        <>
        
        <div className="ai-cont">




<div>
    <ApiFetch inputvalue = {inputvalue}/> 
</div>
        </div>
        </>

    )
}
export default Aisupoort;




