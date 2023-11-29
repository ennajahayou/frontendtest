import React from 'react';

function ExecutionPanel({ title, tasks }) {
  return (
    <div className="execution-panel">
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <p>{task.name}</p>
          <button className={task.action.toLowerCase()}>{task.action}</button>
        </div>
      ))}
    </div>
  );
}

export default ExecutionPanel;
