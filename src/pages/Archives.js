import React, { useState } from 'react';

import { useContext } from 'react';
import { TasksContext } from './TasksContext';

import './Archives.css';
import Sidebar from '../Components/SidebarDIO';

import logo5 from '../images/logo5.png';



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
        <div className="Archives">
        <div className="Archives-board">    
        <h1>Archives Thanks and Tip</h1>
        <h1 className="thanks">0 <img className="symbole" src={logo5}/></h1>
        </div>
        <div className='actions'>
        {tasks.map((task, index) => (
                <div key={index}>
                    <ActionItem date={task.date} status={task.status} text={task.text} />
                </div>
            ))}
            <ActionItem date="01/07/2023" status="refusé" text="Refaire la charte Graphique de la société" />
            <ActionItem date="09/08/2023" status="accepté" text="Faire un wireframe" />
            <ActionItem date="14/08/2023" status="refusé" text="Développer le site" />
        </div>
        </div>
    </div>
    );
}

export default Archives;