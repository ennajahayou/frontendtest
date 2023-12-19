import "./PopupFeed.css";
// import { useContext } from "react";
// import { TasksContext } from "../../TasksContext";
import { useState, useContext, useEffect, useRef } from "react";

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

  const popUpRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUpWorkDone(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopUpWorkDone]);

  return (
    <div ref={popUpRef} className="submition-pop-up">
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
