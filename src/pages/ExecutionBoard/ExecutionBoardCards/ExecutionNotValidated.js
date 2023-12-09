const ExecutionNotValidated = ({ execution }) => {
  const text = execution.archived
    ? "Refused by CEO"
    : "Waiting for CEO validation";
  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default ExecutionNotValidated;
