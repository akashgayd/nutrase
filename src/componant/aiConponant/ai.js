import axios from 'axios';
import './ai.css';
import { useState } from 'react';
import Markdown from 'react-markdown';


const ApiFetch = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [work, setWork] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputsVisible, setInputsVisible] = useState(true);







  const handleSubmit = async (e) => {





// alrt when the user not fil any input value that time they will be give error all input submit nessesry

if (
  !name ||
  !gender ||
  !age ||
  !weight ||
  !height ||
  !work ||
  !targetWeight ||
  !days
) {
  alert("Please fill all the boxes.");
  return;
}



    e.preventDefault();
    setLoading(true);
    setResult([]);
    setInputsVisible(false);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
        {
          contents: [
            {
              parts: [
                { text: `name: ${name}` },
                { text: ` current Age: ${age}` },
                { text: `Gender: ${gender}` },
                { text: `Weight in kg: ${weight}` },
                { text: `current height in Fit: ${height}` },
                { text: `working professional: ${work}` },
                { text: `Target Weight: ${targetWeight}` },
                { text: `target Days: ${days}` },
              ],
            },
          ],
        }
      );

      const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available. Please try again.";
      const bulletPoints = answer.split('\n').filter((line) => line.trim() !== '');

      setResult(bulletPoints);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setResult(["An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGender('');
    setAge('');
    setWeight('');
    setTargetWeight('');
    setDays('');
    setHeight('')
    setName('')
    setWork('')
    setResult([]);
    setInputsVisible(true);
  };

  return (
    <>
      

      <div className="main-api-div">
        {inputsVisible ? (
          <div className="many-input-field">
            <form onSubmit={handleSubmit}> 
              {/* Gender */}





              <div className="fitness">
             
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>



{/* userName */}
<div className="fitness">
                <input
                  type="text"
                  placeholder="Your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>


              {/* Age */}
              <div className="fitness">
                <input
                  type="number"
                  placeholder="enter age..."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Weight */}
              <div className="fitness">
                <input
                  type="text"
                  placeholder="weight...."
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* Height */}
              <div className="fitness">
                <input
                  type="number"
                  placeholder="current height in fit.."
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {/* user WOrk */}
              <div className="fitness">
                <input
                  type="text"
                  placeholder="working professional..."
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                />
              </div>



              {/* Target Weight */}
              <div className="fitness">
                <input
                  type="text"
                  placeholder="Target Weight...."
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />
              </div>

              {/* Days */}
              <div className="fitness">
                <input
                  type="number"
                  placeholder="Target Days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div className="main-result">
            <div className="result-display">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul className="result-list">
                  {result.map((item, index) => {
                    // Check for lines starting with * ** and ending with :**
                    const match = item.match(/\* \*\*(.+?)\*\*$/);
                    if (match) {
                      // Extract and render text with bullet point and bold styling
                      const highlightedText = match[1].trim();
                      return (
                        <li key={index} className="result-item highlight">
                          <strong>• {highlightedText}</strong>
                        </li>
                      );
                    }

                    // Render regular text as it is
                    return (
                      <li key={index} className="result-item">
                   <div className='output-container'>
                  <Markdown>{item}</Markdown> 
                  </div>   </li>
                    );
                  })}
                </ul>
              )}

            </div>
            <button className='btn-grad1' onClick={handleReset}>Reset</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApiFetch;
