import React ,{ useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExecutionSelfPerfo.css";
import personna from '../../../images/icones/personna.png';
import useCountdown from "./../useCountdown";
import logo5 from "../../../images/logo5.png";

const ExecutionInReview = ({ id, description, talent ,status ,comments,selfDifficulty ,
  selfReactivity,clickreview ,showceopop,currentExecution , ceo_comments ,ceo_expectations, ceo_reactivity  }) => {
  const DEADLINES = {
    DEAD1: 24,
    DEAD2: 48,
    DEAD3: 72,
  };
  const ExC =0.1
  const ExCP =0.05

  let departHours =24; // Initialiser à une valeur par défaut

  const [showCountdown, setShowCountdown] = useState(true);
  const [showThanks, setShowThanks] = useState(true);
  
  const difficulty =['Easy','Challenging','Hard','Very hard']
  const reactivity =[ 'Cool','On the Spot', 'Over expectation' ,'Prodigious']
  const expectations =['Acceptable','Meet expectations','Over expectations','Excellent']
  const values = [1, 4, 10, 20]
  departHours=values[selfDifficulty]*values[selfReactivity]
  departHours=Math.ceil(departHours*(1 + ExC + ExCP))

  if (departHours > 6) {
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
      setShowThanks(true);
    } else {
      setShowCountdown(true);
      setShowThanks(false);
    }
  }, [departHours]);

  const [showDetails, setShowDetails] = useState(false);

  const [showPeerReview, setShowPeerReview] = useState(false);
  const divStyle = { // Taille de police plus grande
    fontWeight: 'bold', // Poids de police plus épais
  };

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
      <div className="creator">Creator : <div style={divStyle}>{talent}</div> </div>
      <div className="statut">Status :<div style={divStyle}>  {status}</div></div>
      <div className="count-down" >{showCountdown ? (
        <>
          <p >Review Countdown <div style={divStyle}>{`${hours}H:${minutes}Mn:${seconds}s`}</div></p>
        </>
      ) : (
        <>
          <p style={divStyle}>No Review Countdown</p>
        </>
      )}</div>
      </div>
      <div className="description-diopage">
      <div>Execution description :<div style={divStyle}>{description}</div></div>
      </div>
      </div>
      <div className="right">
        <img className="profile" src={personna} />
        <div className="name"> Performer : <div style={divStyle}> {talent} </div></div>
        <div className="thanks-score">
        {showThanks ? (
        <>
          <p>Thanks :<div style={divStyle}>{departHours}</div>  <img className="symbole_th" src={logo5} /></p>
        </>
      ) : (
        <>
          <p>Thanks :<div style={divStyle}> Not Yet</div></p>
        </>
      )}</div>

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
      <div className="comments"><div>Comment :</div><div style={divStyle}> {comments} </div> </div>
      </div>
      </div>
      <div className="right-second">
        <div className="auto-eval"><div>Auto Evaluation:</div>
        <div className="dif-rea">Difficulty :<div style={divStyle}>{difficulty[selfDifficulty]}</div></div>
        <div className="dif-rea">Reactivity: <div style={divStyle}>{reactivity[selfReactivity]}</div> </div>
        </div>
      </div>
      </div>
      <div className="add-second">
      <div className="peer-review">
        <div>Anonyme Peer review 1 Feedback with Choice on Result and Reactivity</div>
        <div>Anonyme Peer review 2 Feedback with Choice on Result and Reactivity</div>
        <div>Anonyme Peer review n Feedback with Choice on Result and Reactivity</div>
      </div>
      <div className="ceo-eval">
        {ceo_comments === null && ceo_expectations ===null && ceo_reactivity===null ? (        
        <div>CEO Evaluation :<div style={divStyle}> Not Yet</div> </div>
        ):(
          <div>
          <div>CEO Evaluation :<div style={divStyle}> {ceo_comments} </div> </div>
          <div>  Expectations :<div style={divStyle}> {expectations[ceo_expectations]} </div></div>  
          <div>Reactivity :<div style={divStyle}> {reactivity[ceo_reactivity]} </div></div>
          </div>
        )}
      </div>
      </div>
      </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? '-' : '+'}
      </button>
      {localStorage.getItem("isCEO") === "1" ? (   
       ceo_comments === null && status !=="Achieved" && (
      <button className="review"  onClick={() => showceopop(id)}><div style={divStyle}> CEO Evaluation</div></button>
        )
        ) : (
      <button className="review"  onClick={clickreview}><div style={divStyle}> Make a review</div></button>
      )}
      </div>
    </div>

    </div>
  );
};
export default ExecutionInReview;