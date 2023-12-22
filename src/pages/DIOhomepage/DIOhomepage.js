import { useState, useContext , useEffect, useRef} from "react";


import Sidebar from "../../Components/SidebarDIO";
import ExecutionInProgress from "./FeedCard/ExecutionInProgress";
import ExecutionInReview from "./FeedCard/ExecutionSelfPerfo";
import ExecutionNotAssigned from "./FeedCard/ExecutionNotAssigned";
import SubmitionPopUp from "./PopUp/SubmitionPopUp";
import ExecutionMessaging from "./ExecutionMessaging";
import ExecutionAttribution from "./ExecutionAttribution";
import WorkDonePopUp from "./PopUp/WorkDonePopUp";
import Work from "./PopUp/Work";
import AttributionPopUp from "./PopUp/AttributionPopUp";
import ExecutionCreation from "./ExecutionCreation";
import SelfReview from "./SelfReview";
import Wallet from "../../Components/Wallet";
import PeerReview from "../ExecutionBoard/PeerReview";
import axios from "axios";
import CEOReview from "../CEOProfil/CEOReview";
import CEONotYet from "../CEOProfil/CEONotYet";
import CEORejected from "../CEOProfil/CEORejected";
import CEOreviewPopUp from "../DIOhomepage/PopUp/CEOreviewPopUp";
import PeerReviewPopUp from "../DIOhomepage/PopUp/PeerReviewPopUp";


import "./DIOhomepage.css";

import { TasksContext } from "../TasksContext";


const DIOhomepage = () => {
  // const dioId = 1; //TODO : add real DIO id

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
  const [CommentPeerReview, setCommentPeerReview] = useState("");

  const [feedbackCEO, setFeedbackCEO] = useState("");
  const [link, setLink] = useState(""); // State to store link value

  let [currentExecution, setCurrentExecution] = useState(null);
  let [name, setName] = useState(null);
  let [linkto, setLinkto] = useState(null);

  const [showPopUpCEO, setShowPopUpCEO] = useState(false);
  const [showPopUpPeerReview, setShowPopUpPeerReview] = useState(false);

  const [ceoReview, setCeoReview] = useState(false);
  const [ceoNotYet, setCeoNotYet] = useState(false);
  const [ceoRejected, setRejected] = useState(false);
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

  let handlePeerReviewClick = (executionId, name ,link) => {
    setShowPopUpPeerReview(true);
    setCurrentExecution(executionId);
    setName(name);
    setLinkto(link)
  };
  let handleCEOReview = (executionId , name ,link) => {
    setCurrentExecution(executionId); // Set the ID of the execution card clicked
    setShowPopUpCEO(true);
    setName(name);
    setLinkto(link) // Toggle the CEO review popup
  };
  console.log(dioTasks)
  const sortedDioTasks = dioTasks.slice().sort((a, b) => a.id - b.id);
  const feed = sortedDioTasks.map((execution ) => {
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
        case "Open":
          return (
            <ExecutionInReview
              id={execution.id}
              description={execution.exec_description}
              talent={execution.talent_name}
              status={execution.status_}
              comments={execution.review_comments}
              selfDifficulty ={execution.review_difficulty}
              selfReactivity ={execution.review_reactivity}
              clickreview={() => handlePeerReviewClick(execution.id,execution.talent_name ,execution.link)}
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
          case "Rejected":
            return (
              <ExecutionInReview
                id={execution.id}
                description={execution.exec_description}
                talent={execution.talent_name}
                status={execution.status_}
                comments={execution.review_comments}
                selfDifficulty ={execution.review_difficulty}
                selfReactivity ={execution.review_reactivity}
                clickreview={() => handlePeerReviewClick(execution.id,execution.talent_name ,execution.link)}
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
              clickreview={() => handlePeerReviewClick(execution.id,execution.talent_name ,execution.link)}
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
            clickreview={() => handlePeerReviewClick(execution.id,execution.talent_name ,execution.link)}
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
              clickreview={() => handlePeerReviewClick(execution.id,execution.talent_name ,execution.link)}
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
  console.log(feed)


  return (
    <div className="App">
      <Sidebar />

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
          executionLink={link}
        />):
        showPeerReview ? (
          <PeerReview
            executionId={currentExecution}
            setShowPeerReview={setShowPeerReview}
          />
      ) : ceoReview ? (
        <CEOReview
          executionId={currentExecution}
          setShowEvaluation={setCeoReview}
          comments={CommentCEO}
        /> 
      ): ceoNotYet ? (  
        <CEONotYet
          executionId={currentExecution}
          feedback={feedbackCEO}
          setFeedback={setFeedbackCEO}
        /> ):ceoRejected ? (
          <CEORejected
          executionId={currentExecution}
          feedback={feedbackCEO}
          setFeedback={setFeedbackCEO}
          />
        ):(
        <div className="main-content">
                  <Wallet  />
          <div className="logo-bar">
            <h1>DIO Thanks and Tip</h1>
            <div  className="barre-reche">
            <input  placeholder="Search"></input>
            </div>
          </div>


          {/* Messaging */}
          <div className="messaging-container" >
              <div className="messages" ref={myDivRef}         style={{
              height: '62vh', // Adjust height as needed
              overflowY: 'scroll',
              marginBottom:'0px',
              marginLeft: '2.2vw',
              paddingRight: '2.8vw',
              scrollbarWidth: '20px', // Largeur de la barre de défilement
              scrollbarColor: '#ccc #f4f4f4'
               // Optional, might not work in all browsers
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
              link={link}
              setLink={setLink}
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
           executor={name}
           link={linkto}
           setCEONotYet={setCeoNotYet}
           setCEORejected={setRejected}
           />
      )}
        {showPopUpPeerReview && ( 
           <PeerReviewPopUp
           setShowPopUpPeerReview={setShowPopUpPeerReview}
           setPeerReview={setShowPeerReview}
           comments={CommentPeerReview}
           setComments={setCommentPeerReview}
           executor={name}
           link={linkto}
           />
      )}
      {showPopUpCEO && ( console.log(currentExecution) )}
        </div>
      )}
    </div>
  );
};

export default DIOhomepage;
