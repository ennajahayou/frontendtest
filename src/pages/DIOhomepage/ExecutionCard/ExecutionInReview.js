import React from "react";
import { Link } from "react-router-dom";
import "../DIOhomepage.css";

const ExecutionInReview = ({ id, description, talent }) => {
  return (
    <div className="message bubble">
      <div>
      <div>Execution’s creator - {talent}</div>
      <div>Execution’s performer - {talent} </div>
      <div className="description-diopage">
      <div>Describe what we should do : </div>
      <div>{description}</div>
      </div>
      </div>
      <div className="statut-dead">
        <div className="statut">Status : Under Review</div>
        <div className="deadline-diopage">Deadline :29/11/2023</div>
      </div>
    </div>
  );
};

export default ExecutionInReview;
