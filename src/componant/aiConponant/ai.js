import axios from "axios";
import "./ai.css";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import loadingImg from '../../aseets/loder2.gif';

import man from "../../aseets/man1.png";
import girl from "../../aseets/girl1.png";
import logo from "../../aseets/logo2.png";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineFilterListOff } from "react-icons/md";
import refress from "../../aseets/refress button.png";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";

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

  
   
  useEffect(() => {
    const userId = auth.currentUser?.uid || "guest"; // Adjust for authenticated users
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
  
  const groupQuestionsByDate = (logs) => {
    const today = new Date();
    const grouped = {
      today: [],
      yesterday: [],
      last7Days: [],
    };

    // using forEach to itrirate the array
    logs.forEach((log) => {
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
      // && (!weight || !height || !work )

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

  // and this is user show the previous input
  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleHistoryClick = (log) => {
    // Set the selected history output
    setSelectedHistoryOutput(log.output);
    // Hide the input form and show the output screen
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
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDh9cgV_kJT9VfhwtGneuXNHGz1ZewnvRs`,
        {
          contents: [
            {
              parts: [
                { text:` i am ${name}.` },
                { text: `my current age is ${age}. `},
                { text:` I m ${gender}.` },
                { text:` my current weight is  ${weight} kg.` },
                { text: ` my current height  is  ${height} fit.` },
                { text: `current   : ${work} is.` },
                { text: `my target weight is ${targetWeight} kg. ` },
                { text: ` Im a  ${vegetarian}  ` },
                { text: `daily food consompsion  ${eat} in a day ` },
                {
                  text: ` this is my ${budget}} in rupeess provied only this budget food and activity  in monthly budget`,
                },
                { text: ` in  ${days} days.` },
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
  
      // Save to Firebase
      const userId = auth.currentUser?.uid || "guest"; // Adjust for authenticated users
      const historyRef = ref(db, `users/${userId}/history`);
      const newEntryRef = push(historyRef);
      await set(newEntryRef, { ...log, output: bulletPoints });
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setResult(["An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };
  


  // that funtion is create the toggle button user  click this button that time show the history of quition
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
    setSelectedHistoryOutput(null); // Clear selected history output
  };
  
  
  const handleShowQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  const groupedQuestions = groupQuestionsByDate(questionsLog);

  return (
    <>
 
      <div className="main-api-div">
        {inputsVisible ? (
          <div className="many-input-field">
            <form onSubmit={handleSubmit}>
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
                    <input
                      className={
                        shakeFields.includes("weight")
                          ? "shake red-outline"
                          : ""
                      }
                      type="number"
                      placeholder="Weight..."
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="fitness">
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
              ) : (
                <>
                  <div className="fitness">
                    <input
                      className={
                        shakeFields.includes("targetWeight")
                          ? "shake red-outline"
                          : ""
                      }
                      type="text"
                      placeholder="Target Weight..."
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <input
                      className={
                        shakeFields.includes("vegetarian")
                          ? "shake red-outline"
                          : ""
                      }
                      type="text"
                      placeholder="vegetararian/nonveg..."
                      value={vegetarian}
                      onChange={(e) => setvegetarian(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <input
                      className={
                        shakeFields.includes("eat") ? "shake red-outline" : ""
                      }
                      type="text"
                      placeholder="daily food consumption..."
                      value={eat}
                      onChange={(e) => seteat(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
                    <input
                      className={
                        shakeFields.includes("budget")
                          ? "shake red-outline"
                          : ""
                      }
                      type="text"
                      placeholder="your budget..."
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <div className="fitness">
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
    <img src={loadingImg} alt="Loading..." className="loding-img" />
  ) : (
    <ul className="ans-container">
      {(selectedHistoryOutput || result).map((item, index) => (
        <li key={index}>
          <Markdown className="markup-text">{item}</Markdown>
        </li>
      ))}
    </ul>
  )}

  <button className="btn-grad1" onClick={handleReset}>
    <img src={refress} />
  </button>
</div>

        )}
      </div>

      <div className="save-quition">
        <button onClick={handleShowQuestions}>
          {showQuestions ? (
            <MdOutlineFilterList className="icons"> </MdOutlineFilterList>
          ) : (
            <MdOutlineFilterListOff className="icons"></MdOutlineFilterListOff>
          )}
        </button>


   

{showQuestions && (
  <div className="save-function">
    <img src={logo} />
    {questionsLog.map((log, index) => (
      <Link style={{color:'black', fontSize:'13px'}}
        key={index}
        className="history-entry"
        onClick={() => handleHistoryClick(log)} // Fetch output on click
      >
        <p>
          <strong>Name:</strong> {log.name}, <strong>Gender:</strong> {log.gender}, <strong>Age:</strong> {log.age}
        </p>
      </Link>
    ))}
  </div>
)}


      </div>
    </>
  );
};

export default ApiFetch;