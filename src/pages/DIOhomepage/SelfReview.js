import "../ExecutionBoard/ExecutionBoard.css";
import { useState, useContext } from "react";
import axios from "axios";
import { TasksContext } from "../TasksContext";
import useCountdown from "./useCountdown";
import righthand from '../../images/icones/hand-right.png';
import lefthand from '../../images/icones/hand-left.png';
import { useEffect } from "react";


const SelfReview = ({
  executionDescription,
  setShowEvaluation,
  executionId,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [workText, setWorkText] = useState("");
  const [countdownValues, setCountdownValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [departHours, setDepartHours] = useState(24); // Initialiser à une valeur par défaut

  const handleDepartHours1 = (value) => {
    setDepartHours(value);
  };




  /*useEffect(() => {
    if (currentQuestion === 3) {
      const endDate = new Date();
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(47);

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft > 0) {
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          setTimeRemaining(`${hours}:${minutes}:${seconds}`);
        } else {
          clearInterval(interval);
          // Code à exécuter une fois le compte à rebours terminé
        }
      }, 1000);
    }
  }, [currentQuestion]);*/

  const { addProposition } = useContext(TasksContext);

  const handleDifficultyClick = (index) => {
    setDifficulty(index);
    setCurrentQuestion(1);
  };

  const handleSubmit = (index) => {
    if (executionId !== 0) {
      const dataReview = {
        userId: localStorage.getItem("userId"),
        executionId: executionId,
        comment: "test",
        difficulty: difficulty,
        reactivity: index,
      };

      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/review/selfReview",
          dataReview
        )
        .then((res) => {
          const newDepartHours = res.data.data.departHours;
          console.log(newDepartHours);
          handleDepartHours1(newDepartHours);
          setCurrentQuestion(3);
        });

      axios.post(process.env.REACT_APP_BACKEND_URL + "/execution/setInReview", {
        executionId: executionId,
        userId: localStorage.getItem("userId"),
        execContent: "Work already done",
      });
    } else {
      const data = {
        userId: localStorage.getItem("userId"),
        executionDescription: executionDescription,
        dioId: 1,
        texte: workText,
      };

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/execution/workDone", data)
        .then((res) => {
          addProposition(executionDescription);
          const dataReview = {
            userId: localStorage.getItem("userId"),
            executionId: res.data.insertId,
            comment: "test",
            difficulty: difficulty,
            reactivity: index,
          };

          axios
            .post(
              process.env.REACT_APP_BACKEND_URL + "/review/selfReview",
              dataReview
            )
            .then((res) => {
              const newDepartHours = res.data.data.departHours;
              console.log(newDepartHours);
              handleDepartHours1(newDepartHours);
              setCurrentQuestion(3);
            }
            );
        });
    }
  };

  return (
    <div className="evaluation-container">
      { currentQuestion === 0 ? (
        <>
          <h2>How difficult was it?</h2>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(0)}
          >
            Easy
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(1)}
          >
            Challenging
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(2)}
          >
            Hard
          </button>
          <button
            className="evaluation-button"
            onClick={() => handleDifficultyClick(3)}
          >
            Very hard
          </button>
        </>
      ) : currentQuestion === 1 ? (
        <>
          <h2>How reactive were you?</h2>
          <button className="evaluation-button" onClick={() => handleSubmit(0)}>
            Cool
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(1)}>
            On the Spot
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(2)}>
            Over Expectation
          </button>
          <button className="evaluation-button" onClick={() => handleSubmit(3)}>
            Prodigious
          </button>
        </>
      ) : (     
        <>
          <h1>CONGRATULATION !</h1>
          <p>You will see your thanks in</p>
          <p>{`${countdownValues.hours}H:${countdownValues.minutes}Mn:${countdownValues.seconds}s`}</p>
          <div className="congratulations">
          <img className="lefthand" src={lefthand} />
          <button
            className="backtofeed-button"
            onClick={() => window.location.reload()}
            // setShowEvaluation(false)}
          >
            Back to Feed
          </button>
          <img className="righthand" src={righthand} />
          </div>
        </>
      )}
    </div>
  );
};

export default SelfReview;
