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
import Wallet from "../../Components/Wallet";
import ExecutionMessaging from "../DIOhomepage/ExecutionMessaging";


import SubmitionPopUp from "../DIOhomepage/PopUp/SubmitionPopUp";


import WorkDonePopUp from "../DIOhomepage/PopUp/WorkDonePopUp";
import Work from "../DIOhomepage/PopUp/Work";
import AttributionPopUp from "../DIOhomepage/PopUp/AttributionPopUp";




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



  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpWorkDone, setShowPopUpWorkDone] = useState(false);
  const [showPopUpWork, setShowPopUpWork] = useState(false);
  const [showPopUpAttribution, setShowPopUpAttribution] = useState(false);
  const [createExecutionText, setCreateExecutionText] = useState("");
  // const [executions, setExecutions] = useState([]);

  const [executionId, setExecutionId] = useState(0);
  const [isAttributingExecution, setIsAttributingExecution] = useState(false);
  const [isCreatingExecution, setIsCreatingExecution] = useState(false);
  const [
    creationExecutionWorkAlreadyDone,
    setCreationExecutionWorkAlreadyDone,
  ] = useState(false);

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
          </div>
          <Wallet  />
          <div className="execution-container">
            

              
              

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
          <ExecutionMessaging
              createExecutionText={createExecutionText}
              setCreateExecutionText={setCreateExecutionText}
              setShowPopUp={setShowPopUp}
            />
          {/* Fin Messaging */}
          {showPopUp && (
            <SubmitionPopUp
              executionDescription={createExecutionText}
              dioId="1"
              setShowPopUp={setShowPopUp}
              setShowPopUpWorkDone={setShowPopUpWorkDone}
            />
          )}
          {showPopUpWorkDone && (
            <WorkDonePopUp
              setShowPopUpWorkDone={setShowPopUpWorkDone}
              setShowPopUpWork={setShowPopUpWork}
            />
          )}
          {showPopUpWork && (
            <Work
              setShowPopUpWork={setShowPopUpWork}
              setSelfReview={setCreationExecutionWorkAlreadyDone}
              setExecutionId={setExecutionId}
            />
          )}
          {showPopUpAttribution && (
            <AttributionPopUp
              setIsAttributingExecution={setIsAttributingExecution}
              setShowPopUpAttribution={setShowPopUpAttribution}
              setSelfReview={setCreationExecutionWorkAlreadyDone}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutionBoard;
