import React, { useState, useEffect } from "react";
import "./ExecutionBoard.css";
// import Sidebar from "../../../Components/Sidebar";
import Sidebar from "../../Components/SidebarDIO.js";
import PeerReview from "./PeerReview";
import SelfReview from "./SelfReview";
import axios from "axios";
import ExecutionCards from "./ExecutionCards";
import CEOReview from "../CEOProfil/CEOReview";
import CEOreviewPopUp from "../DIOhomepage/PopUp/CEOreviewPopUp";

import logo5 from "../../images/logo5.png";


const ExecutionBoard = () => {
  const dioId = 1;
  const [droppedTaskIndex, setDroppedTaskIndex] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false); // Nouvel état
  const [myExecutions, setMyExecutions] = useState([]);
  const [executionsInReview, setExecutionsInReview] = useState([]);
  const [showPopUpCEO, setShowPopUpCEO] = useState(false);

  const [finishedTasks, setFinishedTasks] = useState([]);
  const [ceoReview, setCeoReview] = useState(false);
  const [currentExecution, setCurrentExecution] = useState(null);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/executionBoard/myExecutions?userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        setMyExecutions(res.data);
      });
      axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/ceoprofil/executionFinished?dioId=" +
          dioId
      )
      .then((res) => {
        setFinishedTasks(res.data);
      });

    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/executionBoard/ExecutionsInReview?userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        setExecutionsInReview(res.data);
      });
  }, []);

  const handleDropClick = (index) => {
    setDroppedTaskIndex(index);
  };

  const handleThanksClick = (executionId) => {
    setDroppedTaskIndex(executionId);
    setShowEvaluation(true);
  };

  const [showPeerReview, setShowPeerReview] = useState(false);

  const handlePeerReviewClick = () => {
    setShowPeerReview(true);
  };

  const executionFeed = myExecutions.map((execution) => (
    <ExecutionCards
      execution={execution}
      handleThanksClick={handleThanksClick}
      handleDropClick={handleDropClick}
      droppedTaskIndex={droppedTaskIndex}
    />
  ));

  return (
    <div className="container1">
      <Sidebar/>
      
      {ceoReview ? (
        <CEOReview
          executionId={currentExecution}
          setShowEvaluation={setCeoReview}
        />
      ):showPeerReview ? (
        <PeerReview
          executionId={droppedTaskIndex}
          setShowPeerReview={setShowPeerReview}
        />
      ) : showEvaluation ? (
        <SelfReview
          executionId={droppedTaskIndex}
          setShowEvaluation={setShowEvaluation}
        />
      ) : (
        <div className="main-content">
          <div className="execution-board">
          <h1>Work Board</h1>
          <h1 className="thanks">
            1 429 690 <img className="symbole" src={logo5} />
          </h1>
          </div>
          <div className="execution-container">
            <div className="executions my">
              <h2>My Execution</h2>
              <div className="scroll">{executionFeed}</div>

              {/* {myExecutions.map((task) => (
                <div className="execution" key={task.id}>
                  <div>
                    <b>{task.exec_description}</b>
                  </div>
                  <div>
                    To do for the {new Date(task.deadline).toLocaleDateString()}
                  </div>
                  <div>Status : {task.status_}</div>
                  <div className="buttons-container">
                    <button
                      className="accept-button"
                      onClick={() => handleDropClick(task.id)}
                    >
                      Drop
                    </button>
                    {droppedTaskIndex === task.id && (
                      <button
                        className="thanks-button"
                        onClick={() => {
                          handleThanksClick();
                          setDroppedTaskIndex(task.id);
                        }}
                      >
                        Get Your Thanks
                      </button>
                    )}
                  </div>
                </div>
              ))} */}
            </div>
              {localStorage.getItem("isCEO") === "1" ? (
                <div className="executions DIO">
                <h2 className="fini">CEO Reviews</h2>
              <div className="scroll">  
              {finishedTasks.map((task, index) => (
                <div className="execution" key={index}>
                 <div className="description"> {task.exec_description}</div>
                  <div className="buttons-container">
                    <button
                      onClick={setShowPopUpCEO}
                    >
                      See
                    </button>
                    <div className={`deadline`}>
                    {"until 24/07/2023"}
                  </div>
                  </div>
                </div>

              ))}
              </div>
                </div>
              ) : (
                <div className="executions DIO">
                <h2 className="fini">Peer Reviews</h2>
                <div className="scroll"> 
                {executionsInReview.map((task) => (
                  <div className="execution" key={task.id}>
                    {task.exec_description}
                    <div className="buttons-container">
                      <button
                        className="accept-button"
                        onClick={() => setDroppedTaskIndex(task.id)}
                      >
                        See
                      </button>
                      {droppedTaskIndex === task.id && (
                        <button
                          className="thanks-button"
                          onClick={() => {
                            handlePeerReviewClick();
                            // setDroppedTaskIndex(task.id);
                          }}
                        >
                          Peer review
                        </button>
                      )}
                    </div>
                  </div>
                  ))}
                  </div>
                  </div>
              )}
            {showPopUpCEO && (
            <CEOreviewPopUp
            setShowPopUpCEO={setShowPopUpCEO}
            setCEOReview={setCeoReview}
            setExecutionId={setCurrentExecution}
            />
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionBoard;
