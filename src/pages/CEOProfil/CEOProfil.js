import "./CEOProfil.css";
import Sidebar from "../../Components/SidebarDIO";
import CEOReview from "./CEOReview";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { TasksContext } from "../TasksContext";
import logo5 from "../../images/logo5.png";
import "./CEOProfil.css";

const CEOProfil = () => {
  const { addTask, addDIOTask } = useContext(TasksContext);

  const dioId = 1;
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [ceoReview, setCeoReview] = useState(false);
  const [currentExecution, setCurrentExecution] = useState(null);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/ceoprofil/executionInProgress?dioId=" +
          dioId
      )
      .then((res) => {
        setTasksInProgress(res.data);
        console.log(res.data);
      });
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/ceoprofil/executionFinished?dioId=" +
          dioId
      )
      .then((res) => {
        setFinishedTasks(res.data);
        console.log(res.data);
      });
  }, []);

  const removeTask = (id) => {
    setTasksInProgress(tasksInProgress.filter((task) => task.id !== id));
  };

  const handleAccept = (task) => {
    addTask({
      text: task.exec_description,
      status: "accepté",
      date: new Date().toLocaleDateString(),
    });
    addDIOTask(task);

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/ceoprofil/acceptExecution", {
        executionId: task.id,
      })
      .then((res) => {
        removeTask(task.id);
      });
  };

  const handleRefuse = (task) => {
    addTask({
      text: task.exec_description,
      status: "refusé",
      date: new Date().toLocaleDateString(),
    });

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/ceoprofil/refuseExecution", {
        executionId: task.id,
      })
      .then((res) => {
        removeTask(task.id);
      });
  };

  return (
    <div className="container">
      <Sidebar />
      {ceoReview ? (
        <CEOReview
          executionId={currentExecution}
          setShowEvaluation={setCeoReview}
        />
      ) : (
        <div className="ceo-profile">
          <h1>
            CEO Profil <span style={{ color: "#DDE11D" }}>★</span>
          </h1>
          <h1 className="thanks">
            0 <img className="symbole" src={logo5} />
          </h1>

          <div className="tasks-container">
            <div className="tasks in-progress">
              <h2>In Progress</h2>
              <div className="scroll">
              {tasksInProgress.map((task, index) => (
                <div className="task" key={index}>
                  <div>
                    {task.exec_description} - {task.status_}
                  </div>
                  <div>Proposed by {task.user_name}</div>
                  <div className="buttons-container">
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(task)}
                    >
                      Accepter
                    </button>
                    <button
                      className="refuse-button"
                      onClick={() => handleRefuse(task)}
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>

            <div className="tasks finished">
              <h2 className="fini">Finished</h2>
              <div className="scroll">
              {finishedTasks.map((task, index) => (
                <div className="task1" key={index}>
                  {task.exec_description}
                  <div className={`statuss`}>
                    {task.status_.charAt(0).toUpperCase() +
                      task.status_.slice(1)}
                  </div>
                  <div className="buttons-container">
                    <button
                      onClick={() => {
                        setCeoReview(true);
                        setCurrentExecution(task.id);
                      }}
                    >
                      CEO Review
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CEOProfil;
