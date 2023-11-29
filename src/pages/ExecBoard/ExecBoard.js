import React from 'react';
import SideBar from './Sidebar';
import ExecutionPanel from './ExecutionPanel';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="execution-header">Execution Board</div>
      <div className="panels">
        <ExecutionPanel title="My Execution" tasks={[{ name: 'Create a Wireframe for the Website', action: 'Drop' }]} />
        <ExecutionPanel title="DIO Execution" tasks={[{ name: 'Develop the website', action: 'See' }]} />
      </div>
    </div>
  );
}

export default App;
