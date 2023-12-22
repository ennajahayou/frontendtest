// Importations inchangées
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PeerReview.css";
import righthand from '../../images/icones/hand-right.png';
import lefthand from '../../images/icones/hand-left.png';

const PeerReview = ({ executionId, setShowPeerReview }) => {
  // States inchangés

  // Reste du code avec les corrections et suggestions
  // const [droppedTaskIndex, setDroppedTaskIndex] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false); // Nouvel état

  const [work, setWork] = useState("");

  const [expectedResult, setExpectedResult] = useState(0);
  const [reactivity, setReactivity] = useState(0);
  const [comments, setComments] = useState("");
  const [peerReviewQuestion, setPeerReviewQuestion] = useState(0);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/review/" + executionId)
      .then((res) => {
        if (res.data.exec_content) {
          setWork(res.data.exec_content);
        } else {
          setWork("There is no content for this execution");
        }
      });
  }, []);

  const handleExpectations = (index) => {
    setPeerReviewQuestion(1);
    setExpectedResult(index);
  };

  const handleReactivity = (index) => {
    setPeerReviewQuestion(2);
    setReactivity(index);
  };

  const handleSubmit = () => {
    const data = {
      executionId: executionId,
      userId: localStorage.getItem("userId"),
      comments: comments,
      expectations: expectedResult,
      reactivity: reactivity,
    };
    

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/review/peerReview", data)
      .then((res) => {
        setPeerReviewQuestion(3);
      });
  };

  return (
    <div className="review-container">
      {peerReviewQuestion === -1 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              top: "20px",
              marginBottom: "10px",
              fontSize: "30px",
            }}
          >
            Travail à évaluer :
          </h3>

          <h4
            style={{
              textAlign: "center",
              fontSize: "15px",
              backgroundColor: "#dcdcdc",
              borderRadius: "20px",
              padding: "10px",
              marginBottom: "20px",
              border: "none",
            }}
          >
            {work}
          </h4>

          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <button
              className="evaluation-button"
              onClick={() => setPeerReviewQuestion(0)}
            >
              Passer à l'évaluation
            </button>
          </div>
        </div>
      ) : peerReviewQuestion === 0 ? (
        <>
          <h3 className="result-peerreview"
          >
            Expected Result
          </h3>
          <h3 className="question-peerreview" style={{ fontSize: "25px" }}>
            Does the work reach the expected Goal ?
          </h3>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#E7827C" }}
            onClick={() => handleExpectations(0)}
          >
            Acceptable
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#F8BB45" }}
            onClick={() => handleExpectations(1)}
          >
            Meet expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#B0D715" }}
            onClick={() => handleExpectations(2)}
          >
            Over expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#248D35" }}
            onClick={() => handleExpectations(3)}
          >
            Excellent
          </button>
        </>
      ) : peerReviewQuestion === 1 ? (
        <>
          <h3 className="result-peerreview"
          >
            Reactivity
          </h3>
          <h3 className="question-peerreview" style={{ fontSize: "25px" }}>How reactive was the talent ?</h3>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#E7827C" }}
            onClick={() => handleReactivity(0)}
          >
            Cool
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#F8BB45" }}
            onClick={() => handleReactivity(1)}
          >
            On the Spot
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#B0D715" }}
            onClick={() => handleReactivity(2)}
          >
            Over Expectation
          </button>
          <button
            className="evaluation-button"
            style={{ backgroundColor: "#248D35" }}
            onClick={() => handleReactivity(3)}
          >
            Prodigious
          </button>
        </>
      ) : peerReviewQuestion === 2 ? (
        <>
          <h3 className="result-peerreview"

          >
            Finally
          </h3>
          <h3 className="question-peerreview" style={{ textAlign: "center", fontSize: "25px" }}>
            What would it take to make it better ?
          </h3>
          <input 
          className="input-feed"
            type="text"
            placeholder="describe it here..."
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "120px",
            }}
          >
            <span
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={handleSubmit}
            >
              Send your feedback    ➡
            </span>
          </div>
        </>
      ) : (

        <>
          <h1>CONGRATULATION !</h1>

        <>
          <p>You win Thanks for your peer review</p>
          <p>{` Thanks`}</p>
        </>
          <div className="congratulations-peer">
          <img className="lefthand" src={lefthand} />
          <button
            className="backtofeed-button-peer"
            onClick={() => window.location.reload()}
            // setShowEvaluation(false)}
          >
            Back to Feed
          </button>
          <img className="righthand" src={righthand} />
          </div>
        </>

      )}
    </div>
  );
};

export default PeerReview;
