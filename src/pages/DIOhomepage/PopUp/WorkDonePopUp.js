import "../DIOhomepage.css";
// import { useContext } from "react";
// import { TasksContext } from "../../TasksContext";

const WorkDonePopUp = ({
  setShowPopUpWorkDone,
  setShowPopUpWork,
  setExecutionId,
}) => {
  // TODO: add real information in jsonData

  // const { setProp, addProp } = useContext(TasksContext);

  const handleClickNotDone = () => {
    setShowPopUpWorkDone(false);
  };

  const handleClickAlreadyDone = () => {
    setShowPopUpWorkDone(false);
    setShowPopUpWork(true);
  };

  return (
    <div className="submition-pop-up">
      <button className="submitButton" onClick={handleClickNotDone}>
        Not done
      </button>
      <button className="submitButton" onClick={handleClickAlreadyDone}>
        Already done
      </button>
    </div>
  );
};

export default WorkDonePopUp;
