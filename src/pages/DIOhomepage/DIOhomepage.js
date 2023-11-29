import { useState, useContext } from "react";

import Sidebar from "../../Components/SidebarDIO";
import ExecutionInProgress from "./ExecutionCard/ExecutionInProgress";
import ExecutionInReview from "./ExecutionCard/ExecutionInReview";
import ExecutionNotAssigned from "./ExecutionCard/ExecutionNotAssigned";
import SubmitionPopUp from "./PopUp/SubmitionPopUp";
import ExecutionMessaging from "./ExecutionMessaging";
import ExecutionAttribution from "./ExecutionAttribution";
import WorkDonePopUp from "./PopUp/WorkDonePopUp";
import Work from "./PopUp/Work";
import AttributionPopUp from "./PopUp/AttributionPopUp";
import ExecutionCreation from "./ExecutionCreation";
import SelfReview from "./SelfReview";

import personna from '../../images/icones/personna.png';
import "./DIOhomepage.css";

import { TasksContext } from "../TasksContext";

import logo5 from "../../images/logo5.png";

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
          <div className="logo-bar">
            <img className="personna" src={personna} />
            <h1>DIO Thanks and Tip</h1>
            <h4 className="thanks">
              1 429 690 <img className="symbole" src={logo5} />
            </h4>
          </div>

          {/* Messaging */}
          <div className="messaging-container">
            <div className="scroll">
              <div className="messages">{feed}</div>
            </div>

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
