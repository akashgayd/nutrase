import axios from 'axios';
import './ai.css';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import lode from '../../aseets/loder2.gif';
import Header from '../common/header/Header';
import man from '../../aseets/man1.png';
import girl from '../../aseets/girl1.png';
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

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
  const [currentSection, setCurrentSection] = useState(0);
  const [questionsLog, setQuestionsLog] = useState([]); // Questions log state
  const [showQuestions, setShowQuestions] = useState(false); // State to toggle the visibility of questions

  useEffect(() => {
    // Load saved questions from localStorage on component mount this save only the local storege and also save only last 7 days not save permantly
    const savedLogs = JSON.parse(localStorage.getItem('questionsLog')) || [];
    const filteredLogs = savedLogs.filter(log => {
      const savedDate = new Date(log.timestamp);
      const currentDate = new Date();
      const daysDifference = (currentDate - savedDate) / (1000 * 3600 * 24); // Difference in days
      return daysDifference <= 7; // Only keep logs from the past 7 days   7 days save the data
    });
    setQuestionsLog(filteredLogs);
  }, []);

// the use this funtion user click the button and go to the next page
  const handleNext = () => {
    if (currentSection === 0 && (!name || !gender || !age)) {
      alert('Please fill all fields in this section.');
      return;
    }
    if (currentSection === 1 && (!weight || !height || !work)) {
      alert('Please fill all fields in this section.');
      return;
    }
    setCurrentSection((prev) => prev + 1);   // the user get next page
  };


  //  that is the use to previous quition user can add wrong input that time use this click this and render previous
  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };


  // user not fill all filed that time get alrt
  const handleSubmit = async (e) => {
    if (!name || !gender || !age || !weight || !height || !work || !targetWeight || !days) {
      alert('Please fill all the boxes.');
      return;
    }

    e.preventDefault();
    setLoading(true);
    setResult([]);
    setInputsVisible(false);

    const log = {
      name,
      gender,
      age,
      weight,
      height,
      work,
      targetWeight,
      days,
      timestamp: new Date().toISOString(), // Save timestamp when the question is logged  
    };

    // Save the log to localStorage the quition will be save
    const savedLogs = JSON.parse(localStorage.getItem('questionsLog')) || [];
    savedLogs.push(log);
    localStorage.setItem('questionsLog', JSON.stringify(savedLogs));

    setQuestionsLog((prevLog) => [...prevLog, log]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
        {
          contents: [
            {
              parts: [
                { text: `name: ${name}` },
                { text: `current Age: ${age}` },
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

      const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available. Please try again.';
      const bulletPoints = answer.split('\n').filter((line) => line.trim() !== '');
      setResult(bulletPoints);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setResult(['An error occurred. Please try again.']);
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
    setHeight('');
    setName('');
    setWork('');
    setResult([]);
    setInputsVisible(true);
    setCurrentSection(0);
  };

  const handleShowQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of saved questions
  };

  return (
    <>
      <Header />
      <div className="main-api-div">
        {inputsVisible ? (
          <div className="many-input-field">
            <form onSubmit={handleSubmit}>
              <div className='heding-of-ai'></div>
              {currentSection === 0 ? (
                <>
                  <div className="fitness">
                    <div className="gender-options">
                      <button
                        type="button"
                        className={`gender-btn ${gender === 'male' ? 'selected' : ''}`}
                        onClick={() => setGender('male')}
                      >
                        <img src={man} alt="Male" />
                      </button>
                      <button
                        type="button"
                        className={`gender-btn ${gender === 'female' ? 'selected' : ''}`}
                        onClick={() => setGender('female')}
                      >
                        <img src={girl} alt="Female" className="btn-gender-catagiroes" />
                      </button>
                    </div>
                  </div>
                  <div className="fitness">
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <input
                      type="number"
                      placeholder="Enter age..."
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <button type="button" onClick={handleNext} className='next-btn'>
                    Next
                  </button>
                </>
              ) : currentSection === 1 ? (
                <>
                  <div className="fitness">
                    <input
                      type="text"
                      placeholder="Weight..."
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <input
                      type="number"
                      placeholder="Current height in ft..."
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <input
                      type="text"
                      placeholder="Working professional..."
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                    />
                  </div>
                  <div className='btn-next-previous'>
                    <button type="button" onClick={handlePrevious} className='previous-btn'>
                      Previous
                    </button>
                    <button type="button" onClick={handleNext} className='next-btn'>
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="fitness">
                    <input
                      type="text"
                      placeholder="Target Weight..."
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <input
                      type="number"
                      placeholder="Target Days"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </div>
                  <div className='btn-next-previous'>
                    <button type="button" onClick={handlePrevious} className='previous-btn'>
                      Previous
                    </button>
                    <button type="submit" className='next-btn'>Submit</button>
                  </div>
                </>
              )}
            </form>
          </div>
        ) : (
          <div className="main-result">
            <div className="result-display">
              {loading ? (
                <img src={lode} alt="Loading..." />
              ) : (
                <ul className="result-list">
                  {result.map((item, index) => (
                    <li key={index} className="result-item">
                      <Markdown>{item}</Markdown>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="btn-grad1" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Button to show saved questions */}
      <div className='save-quition'>
      <button onClick={handleShowQuestions}>
        {showQuestions ? <BsToggleOn className='icons'> </BsToggleOn> : <BsToggleOff className='icons'></BsToggleOff>}
      </button>
      

      {showQuestions && (
        <div className='save-function'>
          <h3>Saved Questions Log</h3>
          {questionsLog.length > 0 ? (
            <ul>
              {questionsLog.map((log, index) => (
                <li key={index}>
                  Name: {log.name}, Gender: {log.gender}, Age: {log.age}, Weight: {log.weight},
                  Height: {log.height}, Work: {log.work}, Target Weight: {log.targetWeight},
                  Days: {log.days}
                </li>
              ))}
            </ul>
          ) : (
            <p>No saved questions yet.</p>
          )}
        
        </div>
      )}
      </div>
    </>
  );
}

export default ApiFetch;
