import axios from 'axios';
import './ai.css';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import loadingImg from '../../aseets/loder2.gif';
import Header from '../common/header/Header';
import man from '../../aseets/man1.png';
import girl from '../../aseets/girl1.png';
import logo from '../../aseets/logo2.png';
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import refress from '../../aseets/refress button.png';

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
  const [questionsLog, setQuestionsLog] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);





  // save the quition in days vise just like today yesterday and last 7 days only
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('questionsLog')) || [];
    const filteredLogs = savedLogs.filter(log => {
      const savedDate = new Date(log.timestamp);
      const currentDate = new Date();
      const daysDifference = (currentDate - savedDate) / (1000 * 3600 * 24);
      return daysDifference <= 7;
    });
    setQuestionsLog(filteredLogs);
  }, []);


  // this function is use to add date which  quition is ask today or yesterday somthing
  const groupQuestionsByDate = (logs) => {
    const today = new Date();
    const grouped = {
      today: [],
      yesterday: [],
      last7Days: []
    };

    // using forEach to itrirate the array 
    logs.forEach(log => {
      const logDate = new Date(log.timestamp);
      const logDay = logDate.getDate();
      const todayDay = today.getDate();


      // usnig the condition check the what is ask the quition today or tommarow 
      if (
        logDate.getFullYear() === today.getFullYear() &&
        logDate.getMonth() === today.getMonth()
      ) {
        if (logDay === todayDay) {
          grouped.today.push(log);
        } else if (logDay === todayDay - 1) {
          grouped.yesterday.push(log);
        } else {
          grouped.last7Days.push(log);
        }
      } else {
        grouped.last7Days.push(log);
      }
    });

    return grouped;
  };


  // that can be use nextfunction the click the buttion user show next input
  const handleNext = () => {
    if (currentSection === 0 && (!name || !gender || !age)) {
      alert('Please fill all fields in this section.');
      return;
    }
    if (currentSection === 1 && (!weight || !height || !work)) {
      alert('Please fill all fields in this section.');
      return;
    }
    setCurrentSection((prev) => prev + 1);
  };




  // and this is user show the previous input
  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

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
      timestamp: new Date().toISOString(),
    };


    // save the quition in localstorage
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
  // input field will be enter and click the button input filed will be empty
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


  // that funtion is create the toggle button user  click this button that time show the history of quition
  const handleShowQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  const groupedQuestions = groupQuestionsByDate(questionsLog);

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
                <img src={loadingImg} alt="Loading..." />
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
             < img src={refress}/>
            </button>
          </div>
        )}
      </div>

      <div className='save-quition'>
        <button onClick={handleShowQuestions}>
          {showQuestions ? <MdOutlineFilterList className='icons'> </MdOutlineFilterList> : <MdOutlineFilterListOff className='icons'></MdOutlineFilterListOff>}
        </button>

        {showQuestions && (
          <div className='save-function'>
            <img src={logo} />
            {Object.keys(groupedQuestions).map((key) => (
              <div key={key}>
                <p>{key === 'today' ? 'Today' : key === 'yesterday' ? 'Yesterday' : 'Last 7 Days'}</p>
                {groupedQuestions[key].length > 0 ? (
                  <ul>
                    {groupedQuestions[key].map((log, index) => (
                      <li key={index} className='history-materiul'>
                        Name: {log.name}, Gender: {log.gender}, Age: {log.age}, Weight: {log.weight},
                        Height: {log.height}, Work: {log.work}, Target Weight: {log.targetWeight},
                        Days: {log.days}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No questions available in this category.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ApiFetch;
