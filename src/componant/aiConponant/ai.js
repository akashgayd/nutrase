import axios from 'axios';
import './ai.css';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import save from '../../aseets/send.png';
import dunlod from '../../aseets/Download-Button.png';
import Aiimm from '../../aseets/Ria-Button.png';
import Header from '../header/Header';
import {useNavigate} from 'react-router-dom';
import home from '../../aseets/home.png';

const ApiFetch = () => {
  const [inputValue, setInputValue] = useState(''); // User input
  const [question, setQuestion] = useState(''); // Displayed question
  const [result, setResult] = useState(''); // API response
  const [loading, setLoading] = useState(false); // Loading state



  const[gender,setgender] = useState("")
  const[age,setage] = useState('age :')
  const[weight,setweight] = useState('weight [KG]  : ')
  const[tweight,setTweight] = useState('target :')
  const[tDays,setDays] = useState('days :')


  const navigate = useNavigate();

  function navigater(){
    navigate("/")
  }
 

  const generateAnswer = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert('Please enter some text.');
      return;
    }

    setLoading(true);
    setResult("Loading...");
    setQuestion(inputValue); // Save the user's question to display it

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
        {
          contents: [
            {
              parts: [{ text: inputValue}],
            },
          ],
        }
      );


      console.log(response);
      const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
      setResult(answer);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult("Failed to fetch the answer. Please try again.");
    } finally {
      setLoading(false);
      setInputValue(''); // Clear the input field 
    }
  };




  const Nesponse = async(e)=>{
    setLoading(true);
    setResult("Loading...");
    e.preventDefault();

    try {
        const fething = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
          {
            contents: [
              {
                parts: [{ text: age},{text: gender},{text:weight},{text:tweight},{text:tDays}],
              },
            ],
          }
        
        );
        const answer = fething.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
      setgender(answer);

    //   setDays(answer);
    //   setage(answer);
    //   setTweight(answer);
    //   setweight(answer);

    }
    catch(error){

        console.log("catch error")
    }
    finally{
        setLoading(false);
        setResult(" ");
        setDays("Days :")
        setage("age : ")
        setTweight("Target : ");
        setweight(" weight : ")
    }

   
    
  }


   

  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Question:", 10, 10);
    doc.text(question, 10, 20);
   
    doc.text("Response:", 10, 40);   
     doc.text(gender, 10, 6);
    
    doc.text(result, 10, 50);

    doc.save("response.pdf");
  };

 

  return (
    <>
    <div className='my-nav-bar-ai'>
    <Header/>
    </div>
   
    
    <div className='main-api-div'>
   


    



<div className='many-input-filed'>
<div className='ria-button-img'><img src={Aiimm}/>
<p>Chat with Ai</p>

</div>   
<form onSubmit={Nesponse}>
 
{/*  */}

<div className='gender'>
<h4>Gender</h4>
<select value={gender} onChange={(e)=> setgender(e.target.value)} >

<option value=''>Select</option>

<option value='male'>male</option>
<option value='female'>female</option>
<option value='other'>other</option>

</select>

</div>




{/* age */}
<div className='fitness'>
<input type='text' placeholder='example age:30' value={age} onChange={(e)=> setage(e.target.value)}/>
</div>
    

    {/* weight */}
<div className='fitness'>
<input type='text' placeholder='example weight:70' value={weight} onChange={(e)=> setweight(e.target.value)}/>
</div>
    


    {/* target weight how many wait gain or loss */}
<div className='fitness'>
<input type='text' placeholder='example : target weight : 80'  value={tweight} onChange={(e)=> setTweight(e.target.value)}/>
</div>
    

    {/* target days how many days to weight gain or weight loss*/}

<div className='fitness'>
<input type='text' placeholder='example target days :20'  value={tDays} onChange={(e)=> setDays(e.target.value)}/>
</div>


<button type='submit'>Submit</button>
</form>








</div>

      <div className='api-data-fetch'>

<div className='user-response'>

        {/* Display a user all quition */}
        {question && (
          <div className='user-query'>
            <strong>Query:</strong>
            <p>{question}</p>
          </div>
        )}

        {/* Display API response  one and other*/}
        {result && (
          <div className='generated-response'>
         
            <strong>Response:</strong>
            <p>{result.replaceAll('*', ' ')}</p>
          
          </div>
          
        )}
           <p>{gender.replaceAll("*"," ")}</p>

        </div>
        
   

        <div className='my-input'>
          {/*  main Input field  direct ask the quition*/}
          <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Enter your queries' />

     
          <button onClick={generateAnswer}>
            <img src={save}/>
          </button>
          

     
          <button onClick={saveAsPDF} disabled={!result}>
           <img src={dunlod}/>
          </button>

          <button onClick={navigater}><img src={home}/></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ApiFetch;
