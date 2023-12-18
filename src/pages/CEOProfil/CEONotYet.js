import "./CEONotYet.css";
import { useState } from "react";
import axios from "axios";
import righthand from '../../images/icones/hand-right.png';
import lefthand from '../../images/icones/hand-left.png';

const CEONotYet = ({ executionId, setShowEvaluation ,setShowPopUpCEO ,comments , feedback, setFeedback}) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [expectations, setExpectations] = useState(0);

  const handleExpectationsClick = (index) => {
    setExpectations(index);
    setCurrentQuestion(2);
  };

  const handleSubmit = (index) => {
    const data = {
      executionId: executionId,
      feedback: feedback,
      status:"On going"
    };
    axios.post(process.env.REACT_APP_BACKEND_URL + "/execution/NotYet", data);
    window.location.reload()

  };

  return (
    <div className="evaluation-container">
          <h3 >Finally</h3>
          <h3 className="better">What would it take to make it better ?</h3>

            <input className="input-feed"  placeholder="describe it here..."   value={feedback}
            onChange={(e) => setFeedback(e.target.value)}></input>
          <button
            className="feedback"
            onClick={() => handleSubmit() }
            //setShowEvaluation(false)}
          >
            Send Your feed back  ➡
          </button>


    </div>          //onClick={() => window.location.reload()}
  );
};

export default CEONotYet;
