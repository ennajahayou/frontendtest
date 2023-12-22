import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import "./PeerReviewPopUp.css";

const PeerReviewPopUp = ({
  setShowPopUpPeerReview,
  setPeerReview,
  comments,
  setComments,
  setExecutionId,
  setName,
  executor,
  setPeerReviewNotYet,
  link

}) => {
  // TODO: add real information in jsonData
  const handleClickNotYet = () => {
    setShowPopUpPeerReview(false);
    setPeerReviewNotYet(true);
  };


  const handleClickEvaluate = () => {
    setShowPopUpPeerReview(false);
    setPeerReview(true);
  };

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUpPeerReview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopUpPeerReview]);



  return (
    <div ref={popUpRef} className="submition-pop-up-work-peerreview">
    <h2 style={{wordWrap: 'break-word'} }>{executor}'s work</h2>
    <div className="input-circle">
    <div className="span">
    {/*<div className="files"><span class="circle"></span><div className="span-text">Files 1</div></div> */}
    <div className="files"><span class="circle"></span><div className="span-text">{link === "" ?(<a>No link </a>):(<a href={link} target="_blank">Link </a>)}</div></div>
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
      className="button3"
      onClick={handleClickEvaluate}
    >     
      Make Review
    </button>
    </div>
    </div>
  );
};

export default PeerReviewPopUp;
