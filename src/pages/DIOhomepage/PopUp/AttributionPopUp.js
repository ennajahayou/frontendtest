import "./PopupFeed.css";
import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

const AttributionPopUp = ({
  setIsAttributingExecution,
  setShowPopUpAttribution,
  setSelfReview,
}) => {
  // TODO: add real information in jsonData

  const handleClickNotDone = () => {
    setShowPopUpAttribution(false);
    setIsAttributingExecution(true);
  };

  const handleClickAlreadyDone = () => {
    setShowPopUpAttribution(false);
    setSelfReview(true);
  };

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUpAttribution(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopUpAttribution]);

  return (
    <div ref={popUpRef}  className="submition-pop-up">
      <button className="submitButton" onClick={handleClickNotDone}>
        Not done
      </button>
      <button className="submitButton" onClick={handleClickAlreadyDone}>
        Already done
      </button>
    </div>
  );
};

export default AttributionPopUp;
