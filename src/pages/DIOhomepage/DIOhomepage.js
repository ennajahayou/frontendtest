import { useState, useContext , useEffect, useRef} from "react";


import Sidebar from "../../Components/SidebarDIO";
import ExecutionInProgress from "./FeedCard/ExecutionInProgress";
import ExecutionInReview from "./FeedCard/ExecutionInReview";
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
  // const [executions, setExecutions] = useState([]);
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
  

  const feed = dioTasks.map((execution) => {
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
          />
        );
      default:
        return <></>;
    }
  });



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
        />
      ) : (
        <div className="main-content">
                  <Wallet  />
          <div className="logo-bar">
            <h1>DIO Thanks and Tip</h1>
          </div>
          <div  className="barre-reche">
            <input placeholder="Barre de recherche"></input>
          </div>
  

          {/* Messaging */}
          <div className="messaging-container" >
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
        </div>
      )}
    </div>
  );
};

export default DIOhomepage;
