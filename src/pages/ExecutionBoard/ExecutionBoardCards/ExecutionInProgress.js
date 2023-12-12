const ExecutionInProgress = ({
  execution,
  handleDropClick,
  handleThanksClick,
  droppedTaskIndex,
}) => {
  const formatDeadline = new Date(execution.deadline).toLocaleDateString();

  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>To do for the {formatDeadline}</div>
      <div>Status : {execution.status_}</div>
      <div className="buttons-container">
        <button
          className="accept-button"
          onClick={() => {
            handleDropClick(execution.id);
          }}
        >
          Drop
        </button>
        {droppedTaskIndex === execution.id && (
          <button
            className="thanks-button"
            onClick={() => {
              handleThanksClick(execution.id);
            }}
          >
            Get Your Thanks
          </button>
        )}
      </div>
    </div>
  );
};

export default ExecutionInProgress;
