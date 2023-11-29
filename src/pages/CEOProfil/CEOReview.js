import "../ExecutionBoard/ExecutionBoard.css";
import { useState } from "react";
import axios from "axios";
import righthand from '../../images/icones/hand-right.png';
import lefthand from '../../images/icones/hand-left.png';

const CEOReview = ({ executionId, setShowEvaluation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [expectations, setExpectations] = useState(0);
  const [comments, setComments] = useState("");

  const handleExpectationsClick = (index) => {
    setExpectations(index);
    setCurrentQuestion(2);
  };

  const handleSubmit = (index) => {
    const data = {
      executionId: executionId,
      userId: localStorage.getItem("userId"),
      comments: comments,
      expectations: expectations,
      reactivity: index,
    };

    axios.post(process.env.REACT_APP_BACKEND_URL + "/review/ceoReview", data);

    setCurrentQuestion(3);
  };

  return (
    <div className="evaluation-container">
      {currentQuestion === 0 ? (
        <>
          <h2>Comments</h2>
          <textarea
            className="evaluation-textarea"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
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
          <h2>Expected Result</h2>
          <div>Does the work reach the expected goal ?</div>
          <button
            className="evaluation-button"
            onClick={() => handleExpectationsClick(0)}
          >
            Acceptable
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleExpectationsClick(1)}
          >
            Meet expectations
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleExpectationsClick(2)}
          >
            Over expectations
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleExpectationsClick(3)}
          >
            Excellent
          </button>
        </>
      ) : currentQuestion === 2 ? (
        <>
          <h2>Reactivity</h2>
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
          <h1>Thank you for your evaluation!</h1>
          <div className="congratulations">
          <img className="lefthand" src={lefthand} />
          <button
            className="backtofeed-button"
            onClick={() => window.location.reload()}
            //setShowEvaluation(false)}
          >
            Back to Fedd
          </button>
          <img className="righthand" src={righthand} />
          </div>
        </>
      )}
    </div>
  );
};

export default CEOReview;
