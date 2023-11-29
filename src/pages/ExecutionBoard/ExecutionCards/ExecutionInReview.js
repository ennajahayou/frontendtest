import axios from "axios";

const ExecutionInReview = ({
  execution,
  handleDropClick,
  handleThanksClick,
  droppedTaskIndex,
}) => {
  const setExecutionDone = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/executionBoard/setDone", {
        executionId: execution.id,
        userId: localStorage.getItem("userId"),
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.scoreThanks > 0) {
            alert("You earned " + res.data.scoreThanks + " thanks");
          } else {
            alert(res.data);
          }
        }
      });
  };

  const formattedDeadline = new Date(execution.deadline).toLocaleDateString();
  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>In review</div>
      <div>Deadline for reviews : {formattedDeadline}</div>
      <button className="accept-button" onClick={setExecutionDone}>
        Set Done
      </button>
    </div>
  );
};

export default ExecutionInReview;
