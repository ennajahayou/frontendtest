import axios from "axios";
import { useState, useContext } from "react";
import "./Work.css";

const SubmitionPopUp = ({
  setShowPopUpWork,
  setIsCreatingExecution,
  setSelfReview,
  setExecutionId,
  workText,
  setWorkText
}) => {
  // TODO: add real information in jsonData

  const handleClick = () => {
    setShowPopUpWork(false);
    setSelfReview(true);
    setExecutionId(0);
  };



  return (
    <div className="submition-pop-up-work">
    <h2>My work</h2>


    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
      value={workText}
      onChange={(e) => setWorkText(e.target.value)}
    />


    <div className="span">
    <div className="files"><span class="circle"></span><div className="span-text">Add Files </div></div>
    <div className="files"><span class="circle"></span><div className="span-text">Add Link</div></div>
    </div>
    <button
      className="evaluation-button1"
      onClick={handleClick}
    >
      Done
    </button>

    </div>
  );
};

export default SubmitionPopUp;
