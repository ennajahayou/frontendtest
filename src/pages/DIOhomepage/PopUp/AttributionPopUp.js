import "../DIOhomepage.css";

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

export default AttributionPopUp;
