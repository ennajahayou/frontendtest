import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import "./CEOreviewPopUp.css";

const CEOreviewPopUp = ({
  setShowPopUpCEO,
  setCEOReview,
  comments,
  setComments,
  setExecutionId,
  setName,
  executor,
  setCEONotYet,
  link

}) => {
  // TODO: add real information in jsonData
  const handleClickNotYet = () => {
    setShowPopUpCEO(false);
    setCEONotYet(true);
  };

  const handleClickrelease = () => {
    setShowPopUpCEO(false);
  };

  const handleClickEvaluate = () => {
    setShowPopUpCEO(false);
    setCEOReview(true);
  };

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUpCEO(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopUpCEO]);



  return (
    <div ref={popUpRef} className="submition-pop-up-work-ceo">
    <h2 style={{wordWrap: 'break-word'} }>{executor}'s work</h2>
    <div className="input-circle">
    <div className="span">
    <div className="files"><span class="circle"></span><div className="span-text">Files 1</div></div>
    <div className="files"><span class="circle"></span><div className="span-text"><a href={link} target="_blank">Link</a></div></div>
    </div>
    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
      value={comments}
      onChange={(e) => setComments(e.target.value)}
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
      onClick={handleClickrelease}
    >     
      release
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
