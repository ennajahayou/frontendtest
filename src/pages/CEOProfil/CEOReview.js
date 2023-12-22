import "../ExecutionBoard/ExecutionBoard.css";
import { useState } from "react";
import axios from "axios";
import righthand from '../../images/icones/hand-right.png';
import lefthand from '../../images/icones/hand-left.png';
import Cookies from "js-cookie";

const CEOReview = ({ executionId, setShowEvaluation ,setShowPopUpCEO ,comments }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [expectations, setExpectations] = useState(0);

  const handleExpectationsClick = (index) => {
    setExpectations(index);
    setCurrentQuestion(2);
  };
  const token = Cookies.get("token");

  const handleSubmit = (index) => {
    const data = {
      executionId: executionId,
      userId: localStorage.getItem("userId"),
      comments: comments,
      expectations: expectations,
      reactivity: index,
    };

    axios.post(process.env.REACT_APP_BACKEND_URL + "/review/ceoReview", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token aux en-têtes
      },
    });

    setCurrentQuestion(3);
  };

  return (
    <div className="evaluation-container">
      {currentQuestion === 0 ? (
        <>
          <h2>Comments</h2>
          <textarea
            className="evaluation-textarea"
            //value={comments}
            //onChange={(e) => setComments(e.target.value)}
          />
          <button
            className="evaluation-button-ceoreview"
            onClick={() => setCurrentQuestion(1)}
          >
            Next
          </button>
        </>
      ) : currentQuestion === 1 ? (
        <>
          <h3 className="result"
          >
            Expected Result
          </h3>
          <h3 className="question" style={{ fontSize: "25px" }}>
            Does the work reach the expected Goal ?
          </h3>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#E7827C" }}
            onClick={() => handleExpectationsClick(0)}
          >
            Acceptable
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#F8BB45" }}
            onClick={() => handleExpectationsClick(1)}
          >
            Meet expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#B0D715" }}
            onClick={() => handleExpectationsClick(2)}
          >
            Over expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#248D35" }}
            onClick={() => handleExpectationsClick(3)}
          >
            Excellent
          </button>
        </>
      ) : currentQuestion === 2 ? (
        <>
          <h3 className="result"
          >
            Reactivity
          </h3>
          <h3 className="question" style={{ fontSize: "25px" }}>How reactive was the talent ?</h3>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#E7827C" }}
            onClick={() => handleSubmit(0)}
          >
            Cool
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#F8BB45" }}
            onClick={() => handleSubmit(1)}
          >
            On the Spot
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#B0D715" }}
            onClick={() => handleSubmit(2)}
          >
            Over Expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#248D35" }}
            onClick={() => handleSubmit(3)}
          >
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
