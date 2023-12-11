import React, { useState, useEffect, useContext , useRef} from "react";
import "./ExecutionBoard.css";
// import Sidebar from "../../../Components/Sidebar";
import Sidebar from "../../Components/SidebarDIO.js";
import PeerReview from "./PeerReview";
import SelfReview from "../DIOhomepage/SelfReview";
import axios from "axios";
import CEOReview from "../CEOProfil/CEOReview";
import Wallet from "../../Components/Wallet";
import ExecutionMessaging from "../DIOhomepage/ExecutionMessaging";
import SubmitionPopUp from "../DIOhomepage/PopUp/SubmitionPopUp";

import WorkDonePopUp from "../DIOhomepage/PopUp/WorkDonePopUp";
import Work from "../DIOhomepage/PopUp/Work";
import AttributionPopUp from "../DIOhomepage/PopUp/AttributionPopUp";

import ExecutionInProgress from "../DIOhomepage/FeedCard/ExecutionInProgress";
import ExecutionInReview from "../DIOhomepage/FeedCard/ExecutionSelfPerfo";
import ExecutionNotAssigned from "../DIOhomepage/FeedCard/ExecutionNotAssigned";
import CEOreviewPopUp from "../DIOhomepage/PopUp/CEOreviewPopUp";
import ExecutionAttribution from "../DIOhomepage/ExecutionAttribution";
import ExecutionCreation from "../DIOhomepage/ExecutionCreation";

import { TasksContext } from "../TasksContext";


const ExecutionBoard = () => {

  const { dioTasks } = useContext(TasksContext);
  const { propositions } = useContext(TasksContext);
  const { prop } = useContext(TasksContext);

  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpWorkDone, setShowPopUpWorkDone] = useState(false);
  const [showPopUpWork, setShowPopUpWork] = useState(false);
  const [showPopUpAttribution, setShowPopUpAttribution] = useState(false);
  const [createExecutionText, setCreateExecutionText] = useState("");
  const [WorkText, setWorkText] = useState("");

  const [showPopUpCEO, setShowPopUpCEO] = useState(false);
  const [ceoReview, setCeoReview] = useState(false);
  const [executionId, setExecutionId] = useState(0);
  const [isAttributingExecution, setIsAttributingExecution] = useState(false);
  const [isCreatingExecution, setIsCreatingExecution] = useState(false);
  const [
    creationExecutionWorkAlreadyDone,
    setCreationExecutionWorkAlreadyDone,
  ] = useState(false);

  const myDivRef = useRef(null);
  

  useEffect(() => {
    if (myDivRef.current) {
        myDivRef.current.scrollTop = myDivRef.current.scrollHeight - myDivRef.current.clientHeight;
    }
  }, []);

  const [showPeerReview, setShowPeerReview] = useState(false);

  const handlePeerReviewClick = () => {
    setShowPeerReview(true);
  };

  const [selectedStatus, setSelectedStatus] = useState("All"); // Initialize with "All" or any default value

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter executions based on the selected status
  const filteredExecutions = dioTasks.filter((execution) => {
    if (selectedStatus === "All") {
      return true; // Show all executions if "All" is selected
    } else {
      return execution.status_ === selectedStatus;
    }
  });

  const feed = filteredExecutions.map((execution) => {
    switch (execution.status_) {
      case "Not assigned":
        return (
          <ExecutionNotAssigned
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            setExecutionId={setExecutionId}
            setShowPopUpAttribution={setShowPopUpAttribution}
          />
        );
      case "In progress":
        return (
          <ExecutionInProgress
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            deadline={execution.deadline}
          />
        );
      case "In review":
        return (
          <ExecutionInReview
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            status={execution.status_}
            comments={execution.comments_}
            selfDifficulty ={execution.difficulty}
            selfReactivity ={execution.reactivity}
            clickreview={handlePeerReviewClick}
            showceopop={setShowPopUpCEO}
          />
        );
        case "Achieved":
          return (
            <ExecutionInReview
              id={execution.id}
              description={execution.exec_description}
              talent={execution.talent_name}
              status={execution.status_}
              comments={execution.comments_}
              selfDifficulty ={execution.difficulty}
              selfReactivity ={execution.reactivity}
              clickreview={handlePeerReviewClick}
              showceopop={setShowPopUpCEO}
            />
          );
      default:
        return <></>;
    }
});

  return (
    <div className="container1">
      <Sidebar/>
      {isAttributingExecution ? (
        <ExecutionAttribution
          executionId={executionId}
          setIsAttributingExecution={setIsAttributingExecution}
        />
      ) : isCreatingExecution ? (
        <ExecutionCreation
          executionDescription={createExecutionText}
          setIsCreatingExecution={setIsCreatingExecution}
        />
      ) : creationExecutionWorkAlreadyDone ? (
        <SelfReview
          executionDescription={createExecutionText}
          setShowEvaluation={setCreationExecutionWorkAlreadyDone}
          executionId={executionId}
          executionComment={WorkText}
        />):
        showPeerReview ? (
          <PeerReview
            executionId={executionId}
            setShowPeerReview={setShowPeerReview}
          />
      ) : ceoReview ? (
        <CEOReview
          executionId={executionId}
          setShowEvaluation={setCeoReview}
        /> 
      ) : (
        <div className="main-content">
                    <Wallet  />
          <div className="execution-board">
          <h1>DIO Thanks and Tip</h1>
          <div>
        {/* Select button to choose status */}

          {localStorage.getItem("isCEO") === "1" ? (   
        <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="Not assigned">My Ongoing</option>
        <option value="In review">Peer Reviews</option>
        <option value="In progress">Execution Authorization</option>
        </select>
        ) : (
          <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Not assigned">My Ongoing</option>
          <option value="In review">Peer Reviews</option>
          </select>
      )}

      </div>
          </div>
          <div className="execution-container">
          <div className="messages" ref={myDivRef}         style={{
          height: '55vh', // Adjust height as needed
          overflowY: 'scroll',
          marginBottom:'0px' // Optional, might not work in all browsers
        }}>{feed.reverse()}</div>
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
          {showPopUpCEO && (
           <CEOreviewPopUp
           setShowPopUpCEO={setShowPopUpCEO}
           setCEOReview={setCeoReview}
           setExecutionId={setExecutionId}
           />
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutionBoard;