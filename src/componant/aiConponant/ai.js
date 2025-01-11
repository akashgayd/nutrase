import axios from "axios";
import "./ai.css";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import loadingImg from '../../aseets/loder2.gif';

import man from "../../aseets/man1.png";
import girl from "../../aseets/girl1.png";
// import logo from "../../aseets/logo2.png";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import Footer from "../common/Footer/footer"
import Header from "../common/header/Header";



const ApiFetch = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [work, setWork] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [days, setDays] = useState("");
  const [vegetarian, setvegetarian] = useState("");
  const [eat, seteat] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputsVisible, setInputsVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [questionsLog, setQuestionsLog] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [shakeFields, setShakeFields] = useState([]);
  const [selectedHistoryOutput, setSelectedHistoryOutput] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reload, setReload] = useState(false);
 





  // the user question and answer will be store in firebase db
  useEffect(() => {
    const userId = auth.currentUser ?.uid || "guest"; 
    const historyRef = ref(db, `users/${userId}/history`);
 
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      const logs = data
        ? Object.values(data).map((entry) => ({
            ...entry,
            timestamp: new Date(entry.timestamp),
          }))
        : [];
      setQuestionsLog(logs);
    });
  }, []);








  // QUESTION CAN STORE IN ATLEST 7 DAYS

  const groupQuestionsByDate = (logs) => {
    const today = new Date();
    const grouped = {
      today: [],
      yesterday: [],
      last7Days: [],
    };

    logs.forEach((log) => {
      const logDate = new Date(log.timestamp);
      const logDay = logDate.getDate();
      const todayDay = today.getDate();

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

  // THIS FUNCTION CAN  BE SHOW THE ERROR USER CAN NOT ADD VALUE IN INPUT THAT TIME 
  const handleNext = () => {
    const emptyFields = [];
    if (currentSection === 0) {
      if (!name) emptyFields.push("name");
      if (!age) emptyFields.push("age");
      if (!gender) emptyFields.push("gender");

      if (emptyFields.length > 0) {
        setShakeFields(emptyFields);
        setTimeout(() => setShakeFields([]), 1000);
        return;
      }
    }
    if (currentSection === 1) {
      if (!weight) emptyFields.push("weight");
      if (!height) emptyFields.push("height");
      if (!work) emptyFields.push("work");

      if (emptyFields.length > 0) {
        setShakeFields(emptyFields);
        setTimeout(() => setShakeFields([]), 1000);
        return;
      }
    }
    setCurrentSection((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleHistoryClick = (log) => {
    setSelectedHistoryOutput(log.output);
    setInputsVisible(false);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const emptyFieldsAll = [];
    if (
      !name ||
      !gender ||
      !age ||
      !weight ||
      !height ||
      !work ||
      !targetWeight ||
      !days ||
      !eat ||
      !budget ||
      !vegetarian
    ) {
      if (!targetWeight) emptyFieldsAll.push("targetWeight");
      if (!days) emptyFieldsAll.push("days");
      if (!eat) emptyFieldsAll.push("eat");
      if (!budget) emptyFieldsAll.push("budget");
      if (!vegetarian) emptyFieldsAll.push("vegetarian");

      if (emptyFieldsAll.length > 0) {
        setShakeFields(emptyFieldsAll);
        setTimeout(() => setShakeFields([]), 1000);
        return;
      }
    }

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
      vegetarian,
      budget,
      eat,
      timestamp: new Date().toISOString(),
    };


    // USSING GEMINI API
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
        {
          contents: [
            {
              parts: [
                { text: `I am ${name}.` },
                { text: `My current age is ${age}.` },
                { text: `I am ${gender}.` },
                { text: `My current weight is ${weight} kg.` },
                { text: `My current height is ${height} ft.` },
                { text: `Current work: ${work} this is my current work also i do not work outside i will be relax after complate my work.` },
                { text: `My target weight is ${targetWeight} kg.` },
                { text: `I am a ${vegetarian}.` },
                { text: `Daily food consumption: ${eat} .` },
                { text: `This is my budget: ${budget} rupees in monthly budget i can spend.` },
                { text: `In ${days} days. give the best diet plan for this creteria, also i will tell the docter so you can provied dietplan im ready for diet plan` },
              ],
            },
          ],
        }
      );

      const answer =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response available. Please try again.";
      const bulletPoints = answer
        .split("\n")
        .filter((line) => line.trim() !== "");
      setResult(bulletPoints);

      // Save to  the firebase user history
      const userId = auth.currentUser ?.uid || "guest"; 
      const historyRef = ref(db, `users/${userId}/history`);
      const newEntryRef = push(historyRef);
      await set(newEntryRef, { ...log, output: bulletPoints });
    } catch(error) {
      console.error("Error fetching data from API:", error);
      setResult(["An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  // CREAR THE INPUT FEILD
  const handleReset = () => {
    setGender("");
    setAge("");
    setWeight("");
    setTargetWeight("");
    setDays("");
    setHeight("");
    setName("");
    setWork("");
    setBudget("");
    seteat("");
    setvegetarian("");
    setResult([]);
    setInputsVisible(true);
    setCurrentSection(0);
    setSelectedHistoryOutput(null); // Clear selected  input
  };

  const handleShowQuestions = () => {
    setShowQuestions(!showQuestions);
    setIsVisible(!isVisible)
  };

  const groupedQuestions = groupQuestionsByDate(questionsLog);


  const RefressBtn=()=>{

    return(
      <>
      <div className="reload-btn">
    <p>sure to reload</p>
    <div>
      <button onClick={handleReset}>Yes</button> <button onClick={()=> setReload(false)}>No</button>
    </div>
    </div>
      </>
    )
  }

  return (
    <>
    <Header/>
    
      <div className="main-api-div">
        <br></br>
        <br></br>
        <br></br>
        {inputsVisible ? (
          
          <div className="many-input-field">
                 <form onSubmit={handleSubmit} className="ai-fill-form">
              <div className="heding-of-ai"></div>
              {currentSection === 0 ? (
                <>
                  <div className="fitness">
                    <div className="gender-options">
                      <button
                        type="button"
                        className={`gender-btn ${
                          gender === "male" ? "selected" : ""
                        }${
                          shakeFields.includes("gender")
                            ? "shake red-outline"
                            : ""
                        }`}
                        onClick={() => setGender("male")}
                      >
                        <img
                          src={man}
                          alt="Male"
                          className="btn-gender-catagiroes"
                        />
                      </button>
                      <button
                        type="button"
                        className={`gender-btn ${
                          gender === "female" ? "selected" : ""
                        } ${
                          shakeFields.includes("name")
                            ? "shake red-outline"
                            : ""
                        }`}
                        onClick={() => setGender("female")}
                      >
                        <img
                          src={girl}
                          alt="Female"
                          className="btn-gender-catagiroes"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="fitness">
                    <label className="ask-label">Enter Name:</label>
                    <input
                      className={
                        shakeFields.includes("name") ? "shake red-outline" : ""
                      }
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <label className="ask-label">Enter Age:</label>
                    <input
                      className={
                        shakeFields.includes("age") ? "shake red-outline" : ""
                      }
                      type="number"
                      placeholder="Enter age..."
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="next-btn"
                  >
                    Next
                  </button>
                </>
              ) : currentSection === 1 ? (
                <>
                  <div className="fitness">
                    <label className="ask-label">Enter Weight:</label>
                    <input
                      className={
                        shakeFields.includes("weight")
                          ? "shake red-outline"
                          : ""
                      }
                      type="number"
                      placeholder="Enter weight in (kg)"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <label className="ask-label">Enter Height:</label>
                    <input
                      className={
                        shakeFields.includes("height")
                          ? "shake red-outline"
                          : ""
                      }
                      type="number"
                      placeholder="Current height in ft..."
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
                    <label className="ask-label">Enter Profession:</label>
                    <input
                      className={
                        shakeFields.includes("work") ? "shake red-outline" : ""
                      }
                      type="text"
                      placeholder="Working professional..."
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                    />
                  </div>
                  <div className="btn-next-previous">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="next-btn"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : currentSection === 2 ? (
                <>
                  <div className="fitness">
                    <label className="ask-label">Target Weight:</label>
                    <input
                      className={
                        shakeFields.includes("targetWeight")
                          ? "shake red-outline"
                          : ""
                      }
                      type="number"
                      placeholder="Target Weight..."
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <label className="ask-label">Are you veg or non-veg:</label>
                    <select
                      className={
                        shakeFields.includes("vegetarian")
                          ? "shake red-outline"
                          : ""
                      }
                      value={vegetarian}
                      onChange={(e) => setvegetarian(e.target.value)}
                    >
                      <option value="veg/non" selected ></option>
                      <option value="veg">Veg</option>
                      <option value="nonveg">Non-Veg</option>
                    </select>
                  </div>

                  <div className="fitness">
                    <label className="ask-label">Daily Food Consumption:</label>
                    <select
                      className={
                        shakeFields.includes("eat") ? "shake red-outline" : ""
                      }
                      value={eat}
                      onChange={(e) => seteat(e.target.value)}
                    >
                      <option value="0" selected></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    
                  </div>

                  <div className="btn-next-previous">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="next-btn"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="fitness">
                    <label className="ask-label">Enter your Budget:</label>
                    <input
                      className={
                        shakeFields.includes("budget")
                          ? "shake red-outline"
                          : ""
                      }
                      type="number"
                      placeholder="your budget..."
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <label className="ask-label">Enter Days :</label>
                    <input
                      className={
                        shakeFields.includes("days") ? "shake red-outline" : ""
                      }
                      type="number"
                      placeholder="Target Days"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </div>
                  <div className="btn-next-previous">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="previous-btn"
                    >
                      Previous
                    </button>
                    <button type="submit" className="next-btn">
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        ) : (
          <div className="main-result">
            {loading ? (
              <img src={loadingImg} alt="Loading..." className="loading-img" />
            ) : (
              <ul className="ans-container">
                {(selectedHistoryOutput || result).map((item, index) => (
                  <li key={index}>
                    <Markdown className="markup-text">{item}</Markdown>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-grad1" onClick={()=> setReload(true)}>
              <RxReload className="icon-reloed"></RxReload>
            </button>
            <div>{reload &&<RefressBtn/>}</div>
          </div>
        )}
      </div>

      <div className="save-quition">
        
        <button onClick={handleShowQuestions}>
          {showQuestions ? (
            <MdOutlineFilterList className="icons"></MdOutlineFilterList>
          ) : (
            <MdOutlineFilterListOff className="icons"></MdOutlineFilterListOff>
          )}
        </button>
        {showQuestions && (
 <div className={`save-function ${isVisible ? "visible" : ""}`}>
    <p>History</p>

    {/*today's question ask by useer */}
    {groupedQuestions.today.length > 0 && (
      <div className="history-group">
        <h5>Today</h5>
        {groupedQuestions.today.map((log, index) => (
          <Link
            className="history-entry"
            key={index}
            onClick={() => handleHistoryClick(log)}
          >
            <p>
              <strong>Name:</strong> {log.name}, <strong>Gender:</strong> {log.gender}, <strong>Age:</strong> {log.age}
              <strong>Weight:</strong> {log.weight}, <strong>Height:</strong> {log.height}, <strong>Profession:</strong> {log.work}
            </p>
          </Link>
        ))}
      </div>
    )}

    {/* Yesterday's  question ask by user */}
    {groupedQuestions.yesterday.length > 0 && (
      <div className="history-group">
        <h5>Yesterday</h5>
        {groupedQuestions.yesterday.map((log, index) => (
          <Link
            className="history-entry"
            key={index}
            onClick={() => handleHistoryClick(log)}
          >
            <p>
              <strong>Name:</strong> {log.name}, <strong>Gender:</strong> {log.gender}, <strong>Age:</strong> {log.age}
              <strong>Weight:</strong> {log.weight}, <strong>Height:</strong> {log.height}, <strong>Profession:</strong> {log.work}
            </p>
          </Link>
        ))}
      </div>
    )}

    {/* Last 7 Days 7days will be complate question will be automaticuly deleted */}
    {groupedQuestions.last7Days.length > 0 && (
      <div className="history-group">
        <h4>Last 7 Days</h4>
        {groupedQuestions.last7Days.map((log, index) => (
          <Link
            className="history-entry"
            key={index}
            onClick={() => handleHistoryClick(log)}
          >
            <p>
              <strong>Name:</strong> {log.name}, <strong>Gender:</strong> {log.gender}, <strong>Age:</strong> {log.age}
              <strong>Weight:</strong> {log.weight}, <strong>Height:</strong> {log.height}, <strong>Profession:</strong> {log.work}
            </p>
          </Link>
        ))}
      </div>
    )}
  </div>
)}
       
      </div>
      <Footer/>
    </>
  );
};

export default ApiFetch;