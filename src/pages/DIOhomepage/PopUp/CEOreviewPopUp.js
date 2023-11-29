import axios from "axios";
import { useState, useContext } from "react";
import "../DIOhomepage.css";

const CEOreviewPopUp = ({
  setShowPopUpCEO,
  setCEOReview,
  setExecutionId,

}) => {
  // TODO: add real information in jsonData
  const handleClickNotYet = () => {
    setShowPopUpCEO(false);
  };

  const handleClickClose = () => {
    setShowPopUpCEO(false);
  };

  const handleClickEvaluate = () => {
    setShowPopUpCEO(false);
    setCEOReview(true);
    setExecutionId(0);
  };



  return (
    <div className="submition-pop-up-work-ceo">
    <h2>My work</h2>
    <div className="input-circle">
    <div className="span">
    <div className="files"><span class="circle"></span><div className="span-text">Files 1</div></div>
    <div className="files"><span class="circle"></span><div className="span-text">Link</div></div>
    </div>
    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
    />
    </div>
    <div className="container-button-ceo">
    <button
      className="button1"
      onClick={handleClickNotYet}
    >     
      Not yet
    </button>
    <button
      className="button2"
      onClick={handleClickClose}
    >     
      Close
    </button>
    <button
      className="button3"
      onClick={handleClickEvaluate}
    >     
      Evaluate it
    </button>
    </div>
    </div>
  );
};

export default CEOreviewPopUp;
