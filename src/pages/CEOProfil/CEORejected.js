import "./CEORejected.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CEORejected = ({ executionId, setShowEvaluation ,setShowPopUpCEO ,comments , feedback, setFeedback}) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [expectations, setExpectations] = useState(0);

  const handleExpectationsClick = (index) => {
    setExpectations(index);
    setCurrentQuestion(2);
  };
  const token = Cookies.get("token");

  const handleSubmit = (index) => {

    const status = document.getElementById('case').checked ? 'Open' : 'Rejected';
    const data = {
      executionId: executionId,
      feedback: feedback,
      status: status
    };
    axios.post(process.env.REACT_APP_BACKEND_URL + "/execution/Rejected", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token aux en-têtes
      },
    });
    window.location.reload()

  };

  return (
    <div className="evaluation-container">
          <h3 >Finally</h3>
          <h3 className="better">What would it take to make it better ?</h3>

            <input className="input-feed"  placeholder="describe it here..."   value={feedback}
            onChange={(e) => setFeedback(e.target.value)}></input>
            <div className="propose">
            <input className="case" type="checkbox" id="case"/>
            <label  for="case">Propose it again to talents</label> 
            </div>
          <button
            className="feedback"
            onClick={handleSubmit }
            //setShowEvaluation(false)}
          >
            Send Your feed back  ➡
          </button>


    </div>          //onClick={() => window.location.reload()}
  );
};

export default CEORejected;
