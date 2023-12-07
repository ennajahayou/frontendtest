import React ,{ useState } from "react";
import { Link } from "react-router-dom";
import "./ExecutionInReview.css";
import personna from '../../../images/icones/personna.png';

const ExecutionInReview = ({ id, description, talent }) => {

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="message bubble">
      <div className="first">
      <div className="exe-description">
      <div className="creator">Execution’s creator - {talent}</div>
      <div className="description-diopage">
      <div>Describe what we should do : </div>
      <div>{description}</div>
      </div>
      <div className="score">score of {talent} : not yet </div>
      </div>
      <div className="statut-dead">
        <div className="performer"> 
        <img className="profile" src={personna} />
        <div className="name"> Performer :{talent} </div>
        </div>
        <div className="statut">Status : Under Review</div>
        <div className="deadline-diopage">Deadline :29/11/2023</div>
        <div className="deadline-diopage">Propose My work</div>
      </div>
      </div>
      <div className="second">
      {showDetails && (
        <div className="additional-info">
      <div className="creator">How are you going to do it « input »</div>
      <div className="description-diopage">
      <div>Doc 1 uploaded or link </div>
      <div>Anonyme Peer review 1 Feedback with Choice on Result and Reactivity</div>
      </div>
        </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? '-' : '+'}
      </button>
      </div>
    </div>
  );
};

export default ExecutionInReview;
