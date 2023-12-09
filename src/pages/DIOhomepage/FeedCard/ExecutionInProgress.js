import React from "react";
import "../DIOhomepage.css";

const ExecutionInProgress = ({ id, description, talent, deadline }) => {
  const formattedDate = new Date(deadline).toLocaleDateString();

  return (
    <div className="message bubble">
      <div>{description}</div>
      {talent} is doing the task for the {formattedDate}.
    </div>
  );
};

export default ExecutionInProgress;
