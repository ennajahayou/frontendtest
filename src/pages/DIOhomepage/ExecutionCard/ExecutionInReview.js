import React from "react";
import { Link } from "react-router-dom";
import "../DIOhomepage.css";

const ExecutionInReview = ({ id, description, talent }) => {
  return (
    <div className="message bubble">
      <div>{description}</div>
      {talent} has finished the task.
      <Link to="/ExecutionBoard">
        <button class="message button">Make a review</button>
      </Link>
    </div>
  );
};

export default ExecutionInReview;
