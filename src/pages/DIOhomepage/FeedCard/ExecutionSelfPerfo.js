import React ,{ useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExecutionSelfPerfo.css";
import personna from '../../../images/icones/personna.png';
import useCountdown from "./../useCountdown";

const ExecutionInReview = ({ id, description, talent ,status ,comments,selfDifficulty ,selfReactivity,clickreview}) => {
  const DEADLINES = {
    DEAD1: 24,
    DEAD2: 48,
    DEAD3: 72,
  };

  let departHours =24; // Initialiser à une valeur par défaut

  const [showCountdown, setShowCountdown] = useState(true);
  
  const difficulty =['Easy','Challenging','Hard','Very hard']
  const reactivity =[ 'Cool','On the Spot', 'Over expectation' ,'Prodigious']
  const values = [1, 4, 10, 20]
  departHours=values[selfDifficulty]*values[selfReactivity]

  if (departHours > 4) {
    if ((values[selfDifficulty] === 4 && values[selfReactivity] === 4)) {
      departHours = DEADLINES.DEAD1;
    } else if (values[selfDifficulty] === 10 || values[selfReactivity] === 10) {
      departHours = DEADLINES.DEAD2 ;
    } else if (values[selfDifficulty] === 20 || values[selfReactivity] === 20) {
      departHours = DEADLINES.DEAD3 ;
    }
  }
  let { hours, minutes, seconds } = useCountdown(departHours);

  useEffect(() => {
    if (departHours < 6) {
      setShowCountdown(false);
    } else {
      setShowCountdown(true);
    }
  }, [departHours]);

  const [showDetails, setShowDetails] = useState(false);

  const [showPeerReview, setShowPeerReview] = useState(false);

  const handlePeerReviewClick = () => {
    setShowPeerReview(true);
  };


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>

    <div className="message bubble">
      <div className="first">
      <div className="left">
      <div className="first-row">
      <div className="creator">Creator : {talent}</div>
      <div className="statut">Status : {status}</div>
      <div className="count-down">{showCountdown ? (
        <>
          <p>{`${hours}H:${minutes}Mn:${seconds}s`}</p>
        </>
      ) : (
        <>
          <p>No deadline</p>
        </>
      )}</div>
      </div>
      <div className="description-diopage">
      <div>Describe what we should do : </div>
      <div>{description}</div>
      </div>
      </div>
      <div className="right">
        <img className="profile" src={personna} />
        <div className="name"> Performer :{talent} </div>
        <div className="thanks-score">Thanks score</div>

      </div>
      </div>
      <div className="second">
      {showDetails && (
      <div className="additional-info">
      <div className="add-first">
      <div className="left">
      <div className="second-row">
      <div className="doc">
      <div>Doc 1 uploaded or link </div>
      <div>Doc 2 uploaded or link</div>
      </div>
      <div className="comments">commentaire : {comments}</div>
      </div>
      </div>
      <div className="right-second">
        <div className="auto-eval">Auto Evaluation :
        Difficulty : 
        {difficulty[selfDifficulty]}
        Reactivity: 
        {reactivity[selfReactivity]}
        </div>
      </div>
      </div>
      <div className="add-second">
        <div>Anonyme Peer review 1 Feedback with Choice on Result and Reactivity</div>
        <div>Anonyme Peer review 2 Feedback with Choice on Result and Reactivity</div>
        <div>Anonyme Peer review n Feedback with Choice on Result and Reactivity</div>
      </div>
      </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? '-' : '+'}
      </button>
      <button className="review"  onClick={clickreview}>Make a review</button>
      </div>
    </div>

    </div>
  );
};
export default ExecutionInReview;