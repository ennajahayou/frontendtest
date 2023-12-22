import React ,{ useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExecutionSelfPerfo.css";
import personna from '../../../images/icones/personna.png';
import useCountdown from "./../useCountdown";
import logo5 from "../../../images/logo5.png";
import axios from "axios";
//import socket from "../../../socket";

const ExecutionInReview = ({ id, description, talent ,status ,comments,selfDifficulty ,
  selfReactivity,clickreview ,showceopop , ceo_comments ,ceo_expectations, 
  ceo_reactivity ,remainingTime,link , achievement_date ,ceoFeedback ,thanks}) => {
  
   /* const [remainingtime, setRemainingTime] = useState(remainingTime);

    useEffect(() => {
      socket.on("remainingTimeUpdated", (updatedRemainingTime) => {
        setRemainingTime(updatedRemainingTime);
      });
  
      // Clean up the socket listener when component unmounts
      return () => {
        socket.off("remainingTimeUpdated");
      };
    }, []);*/
  
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
  //let { hours, minutes, seconds } = useCountdown(3600*departHours);
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
    };
  } else{
    thanks=departHours;
  }


  const { hours, minutes, seconds } = useCountdown(remainingTime);

  useEffect(() => {
    if (departHours < 6 && remainingTime == null ){
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
  const userName = localStorage.getItem('userName');


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  
  return (
    <div>
    <div className="message bubble">
      <div className="first">
      <div className="left">
      <div className="first-row">
      <div className="creator">Creator :<div style={divStyle}>{talent}</div> </div>
      <div className="statut">Status :<div style={divStyle}>  {status}</div></div>
      <div className="count-down" >{status ==="In review"  ? ( 
          <p >Review Countdown <div style={divStyle}>{`${hours}H:${minutes}Mn`}</div></p>
      ) : status ==="Achieved"  ?(
          <p >Achievement Date :<div style={divStyle}>{achievement_date.substring(0,10)+"   "+achievement_date.substring(11,16)}</div></p>
       ):status ==="Open" ?(<p >No Countdown for<div style={divStyle}>Open</div></p>
       ):status ==="Rejected" ?(<p >Date of Closing :<div style={divStyle}></div></p>
       ):(<p >Due Date :<div style={divStyle}></div></p>)}</div>
      </div>
      <div className="description-diopage">
      <div>Execution description :<div style={divStyle}>{description}</div></div>
      </div>
      </div>
      <div className="right">
        <img className="profile" src={personna} />
        <div className="name"> <div style={divStyle}> {talent} </div></div>
        <div className="thanks-score">
        {status ==="In review"  ? ( 
          <p>Thanks :<div style={divStyle}> Not Yet</div></p>
      ) : status ==="Achieved"  ?(
        <p>Thanks :<div style={divStyle}>{thanks}</div>  <img className="symbole_th" src={logo5} /></p>
       ):(<p>Thanks :<div style={divStyle}> Not Yet</div></p>)}</div>

      </div>
      </div>
      <div className="second">
      {showDetails && (
      <div className="additional-info">
      <div className="add-first">
      <div className="left">
      <div className="second-row">
      <div className="comments">
      <div>Comment :</div><div style={divStyle}> {comments} </div> 
      </div>
      <div className="doc">
      <div>{link === "" ?(<p>No link uploaded</p>):( <p>Link 1 uploaded: <a href={link} target="_blank">Link 1</a>.</p>)}</div>

        </div>
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
        {ceo_comments === null && ceo_expectations ===null && ceo_reactivity===null && status === "In review" ? (        
        <div></div>
        ):status === "On going" ?(<div className="ceo-eval">CEO Evaluation :<div style={divStyle}> {ceoFeedback}</div> </div>):(
          <div className="ceo-eval">
          <div>CEO Evaluation :<div style={divStyle}> {ceo_comments} </div> </div>
          <div> Expectations :<div style={divStyle}> {expectations[ceo_expectations]} </div></div>  
          <div>Reactivity :<div style={divStyle}> {reactivity[ceo_reactivity]} </div></div>
          </div>
        )}
      </div>
      </div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? '-' : '+'}
      </button>
      {localStorage.getItem("isCEO") === "1" ? (
  <>
    {ceo_comments === null && status === "In review" && talent !== userName && (
      <button className="review" onClick={() => showceopop(id)}>
        <div style={divStyle}> Evaluate it </div>
      </button>
    )}
    {status === "Open" && talent !== userName && (
      <button className="review">
        <div style={divStyle}> I want to do it </div>
      </button>
    )}
    {status === "On going" && talent === userName && (
      <button className="review">
        <div style={divStyle}> Submit my work </div>
      </button>
    )}
  </>
) : (
  <>
    {status === "In review" && talent !== userName && (
      <button className="review" onClick={() => clickreview(id)}>
        <div style={divStyle}> Make a review</div>
      </button>
    )}
    {status === "Open" && talent !== userName && (
      <button className="review">
        <div style={divStyle}> I want to do it</div>
      </button>
    )}
    {status === "On going" && talent === userName && (
      <button className="review">
        <div style={divStyle}> Submit my work</div>
      </button>
    )}
  </>
)}

      </div>
    </div>

    </div>
  );
};
export default ExecutionInReview;