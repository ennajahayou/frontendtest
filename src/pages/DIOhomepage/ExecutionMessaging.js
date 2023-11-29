import "./DIOhomepage.css";





const ExecutionMessaging = ({
  createExecutionText,
  setCreateExecutionText,
  setShowPopUp,
}) => {


  const createExecution = () => {
    if (createExecutionText !== "") {
      setShowPopUp(true);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      createExecution();
    }

  };

  return (
    <div className="input-container">
      <div className="input-submit">
        <input
          type="text"
          placeholder="Describe what we should do..."
          className="message-input"
          value={createExecutionText}
          onChange={(e) => {
            setCreateExecutionText(e.target.value);
          }}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="send-button"
          onClick={() => createExecution(true)}
        >
          Make it happen
        </button>
      </div>
    </div>
  );
};

export default ExecutionMessaging;
