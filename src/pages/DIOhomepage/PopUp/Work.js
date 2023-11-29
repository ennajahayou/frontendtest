import axios from "axios";
import { useState, useContext } from "react";
import "../DIOhomepage.css";

const SubmitionPopUp = ({
  setShowPopUpWork,
  setIsCreatingExecution,
  setSelfReview,
  setExecutionId,
}) => {
  // TODO: add real information in jsonData

  const handleClick = () => {
    setShowPopUpWork(false);
    setSelfReview(true);
    setExecutionId(0);
  };
  const [workText, setWorkText] = useState("");



  return (
    <div className="submition-pop-up-work">
    <h2>My work</h2>
    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
      value={workText}
      onChange={(e) => setWorkText(e.target.value)}
    />
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
