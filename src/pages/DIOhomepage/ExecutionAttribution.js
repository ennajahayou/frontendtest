import { useState } from "react";

import { useContext } from "react";
import { TasksContext } from "../TasksContext";
import "./ExecutionCreation.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ExecutionAttribution = ({ executionId, setIsAttributingExecution }) => {
  const [howAreYouGoingToMakeIt, setHowAreYouGoingToMakeIt] = useState(true);
  const { setProp } = useContext(TasksContext);

  const [howMake, setHowMake] = useState("");
  const [deliverDate, setDeliverDate] = useState("");

  const handleNext = () => {
    setHowAreYouGoingToMakeIt(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const handleSubmit = () => {
    if (deliverDate !== "") {
      var jsonData = {
        executionId: executionId,
        userId: localStorage.getItem("userId"),
        howMake: howMake,
        deliverDate: deliverDate,
      };

      setIsAttributingExecution(false);

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/execution/assign", jsonData)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        });
    } else {
      alert("Please enter a date");
    }
  };

  return (
    <div className="main-content">
      <div className="attributionFields">
        {howAreYouGoingToMakeIt && (
          <>
            <>How are you going to make it</>
            <input
              type="text"
              className="textfield"
              onKeyDown={handleKeyDown}
              placeholder="How are you going to make it ?"
              value={howMake}
              onChange={(e) => {
                setHowMake(e.target.value);
              }}
            />
            <button
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          </>
        )}
        {!howAreYouGoingToMakeIt && (
          <>
            <>When are you going to deliver it</>
            <input
              type="date"
              className="textfield"
              value={deliverDate}
              onChange={(e) => {
                setDeliverDate(e.target.value);
              }}
            />
            <Link to="/DIO">
              <button onClick={handleSubmit}>Next</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ExecutionAttribution;
