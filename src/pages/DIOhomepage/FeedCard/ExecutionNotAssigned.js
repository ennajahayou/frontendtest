import React from "react";

import "../DIOhomepage.css";

const ExecutionNotAssigned = ({
  id,
  description,
  talent,
  setExecutionId,
  setShowPopUpAttribution,
}) => {
  const handleClick = () => {
    setExecutionId(id);
    setShowPopUpAttribution(true);
  };

  return (
    <div className="message bubble">
      <div>New Action</div>
      {description}
      <button class="message button" onClick={handleClick}>
        I want to do it
      </button>
    </div>
  );
};

export default ExecutionNotAssigned;
