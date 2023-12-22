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
  const [CommentCEO, setCommentCEO] = useState("");

  let [currentExecution, setCurrentExecution] = useState(null);

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
  let handleCEOReview = (executionId) => {
    setCurrentExecution(executionId); // Set the ID of the execution card clicked
    setShowPopUpCEO(true); // Toggle the CEO review popup
  };

  const [selectedStatus, setSelectedStatus] = useState("All"); // Initialize with "All" or any default value

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter executions based on the selected status
  const filteredExecutions = dioTasks.filter((execution) => {
    const userName = localStorage.getItem('userName');
    if (selectedStatus === "All") {
      return true; // Show all executions if "All" is selected
    } else if(selectedStatus === "My Ongoing"){
      return execution.talent_name === userName && execution.status_ !=="Achieved";
    } else if(selectedStatus === "CEO Evaluation" || selectedStatus === "Peer Review"){
      return execution.status_ ==="In review" && execution.talent_name !== userName && execution.ceo_comments ===null
    }
    else {
      return execution.status_ === selectedStatus;
    }
  });
  filteredExecutions.sort((a, b) => a.id - b.id);

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
      case "On going":
          return (
            <ExecutionInReview
              id={execution.id}
              description={execution.exec_description}
              talent={execution.talent_name}
              status={execution.status_}
              comments={execution.review_comments}
              selfDifficulty ={execution.review_difficulty}
              selfReactivity ={execution.review_reactivity}
              clickreview={() => handlePeerReviewClick(execution.id)}
              showceopop={() => handleCEOReview(execution.id ,execution.talent_name ,execution.link) }
              currentExecution={() =>{ setCurrentExecution(execution.id)}}
              ceo_comments={execution.ceo_comments}
              ceo_expectations={execution.ceo_expectations}
              ceo_reactivity={execution.ceo_reactivity}
              remainingTime={execution.remaining_time}
              link={execution.link}
              ceoFeedback={execution.ceo_feedback}
              achievement_date={execution.creation_date}
              thanks={execution.score_thanks}
            />
          );
      case "In review":
        return (
          <ExecutionInReview
            id={execution.id}
            description={execution.exec_description}
            talent={execution.talent_name}
            status={execution.status_}
            comments={execution.review_comments}
            selfDifficulty ={execution.review_difficulty}
            selfReactivity ={execution.review_reactivity}
            clickreview={() => handlePeerReviewClick(execution.id)}
            showceopop={() => handleCEOReview(execution.id ,execution.talent_name ,execution.link) }
            currentExecution={() =>{ setCurrentExecution(execution.id)}}
            ceo_comments={execution.ceo_comments}
            ceo_expectations={execution.ceo_expectations}
            ceo_reactivity={execution.ceo_reactivity}
            remainingTime={execution.remaining_time}
            link={execution.link}
            achievement_date={execution.creation_date}
            thanks={execution.score_thanks}
          />
        );
        case "Achieved":
          return (
            <ExecutionInReview
              id={execution.id}
              description={execution.exec_description}
              talent={execution.talent_name}
              status={execution.status_}
              comments={execution.review_comments}
              selfDifficulty ={execution.review_difficulty}
              selfReactivity ={execution.review_reactivity}
              clickreview={() => handlePeerReviewClick(execution.id)}
              showceopop={() => handleCEOReview(execution.id) }
              currentExecution={() =>{ setCurrentExecution(execution.id)}}
              ceo_comments={execution.ceo_comments}
              ceo_expectations={execution.ceo_expectations}
              ceo_reactivity={execution.ceo_reactivity}
              link={execution.link}
              achievement_date={execution.creation_date}
              thanks={execution.score_thanks}
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
        executionId={currentExecution}
        setShowEvaluation={setCeoReview}
        comments={CommentCEO}
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
        <option value="My Ongoing">My Ongoing</option>
        <option value="CEO Evaluation">CEO Evaluation</option>
        <option value="In progress">Execution Authorization</option>
        </select>
        ) : (
          <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Not assigned">My Ongoing</option>
          <option value="Peer Review">Peer Reviews</option>
          </select>
      )}

      </div>
          </div>
          <div className="execution-container">
          <div className="messages" ref={myDivRef}         style={{
          height: '62vh', // Adjust height as needed
          overflowY: 'scroll',
          marginBottom:'0px' // Optional, might not work in all browsers
        }}>{feed}</div>
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
              WorkText={WorkText}
              setWorkText={setWorkText}
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
           comments={CommentCEO}
           setComments={setCommentCEO}
           />
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutionBoard;