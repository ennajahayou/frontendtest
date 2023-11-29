import "./ExecutionBoard.css";
import { useState } from "react";
import axios from "axios";

const SelfReview = ({ executionId, setShowEvaluation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [workText, setWorkText] = useState("");

  const handleDifficultyClick = (index) => {
    setDifficulty(index);
    setCurrentQuestion(2);
  };

  const handleSubmit = (index) => {
    // const difficultyArray = ["Easy", "Average", "Difficult", "Very Difficult"];
    // const reactivityArray = [
    //   "Cool",
    //   "On the Spot",
    //   "Over Expectation",
    //   "Prodigious",
    // ];

    const dataReview = {
      userId: localStorage.getItem("userId"),
      executionId: executionId,
      comment: "test",
      difficulty: difficulty,
      reactivity: index,
    };

    const dataWork = {
      executionId: executionId,
      texte: workText,
    };

    axios.post(
      process.env.REACT_APP_BACKEND_URL + "/review/selfReview",
      dataReview
    );
    axios.post(
      process.env.REACT_APP_BACKEND_URL + "/executionBoard/save-texte",
      dataWork
    );

    setCurrentQuestion(3);
  };

  return (
    <div className="evaluation-container">
      {currentQuestion === 0 ? (
        <>
          <h2>Put your work</h2>
          <textarea
            className="evaluation-textarea"
            value={workText}
            onChange={(e) => setWorkText(e.target.value)}
          />
          <button
            className="evaluation-button"
            onClick={() => setCurrentQuestion(1)}
          >
            Next
          </button>
        </>
      ) : currentQuestion === 1 ? (
        <>
          <h2>How difficult was it?</h2>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(0)}
          >
            Easy
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(1)}
          >
            Challenging
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(2)}
          >
            Hard
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(3)}
          >
            Very hard
          </button>
        </>
      ) : currentQuestion === 2 ? (
        <>
          <h2>How reactive were you?</h2>
          <button className="evaluation-button" onClick={() => handleSubmit(0)}>
            Cool
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(1)}>
            On the Spot
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(2)}>
            Over Expectation
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(3)}>
            Prodigious
          </button>
        </>
      ) : (
        <>
          <h1>CONGRATULATION!</h1>
          <p>You will see your thanks in</p>
          <p>23:59:47</p>
          <button
            className="evaluation-button"
            onClick={() => setShowEvaluation(false)}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default SelfReview;
