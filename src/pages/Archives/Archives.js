import React, { useState } from 'react';

import { useContext } from 'react';
import { TasksContext } from '../TasksContext';

import './Archives.css';
import Sidebar from '../../Components/SidebarDIO';
import Wallet from "../../Components/Wallet";
import ExecutionMessaging from "../DIOhomepage/ExecutionMessaging";





const ActionItem = ({ date, status, text }) => {
    return (
        <div className="action-item">
            <span className="date">{date}</span>
            <span className={`status ${status}`}>
                ACTION {status === 'accepté' ? <span>✅</span> : <span>❌</span>} : {text}
            </span>
        </div>
    );
};



const Archives = () => {

    const { tasks } = useContext(TasksContext);

    return (
    <div className="container">
        <Sidebar />
        <div className="main-content">
        <Wallet  />
        <div className="execution-board">
          <h1>DIO Thanks and Tip</h1>
          </div>

        <div className='actions'>

        </div>
        <ExecutionMessaging
            />
        </div>
    </div>
    );
}

export default Archives;