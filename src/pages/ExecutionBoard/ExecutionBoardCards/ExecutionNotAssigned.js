const ExecutionNotAssigned = ({ execution }) => {
  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>Not assigned</div>
    </div>
  );
};

export default ExecutionNotAssigned;
