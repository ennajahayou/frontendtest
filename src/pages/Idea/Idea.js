import React, { useState } from 'react';

import { useContext } from 'react';
import { TasksContext } from '../TasksContext';

import './Idea.css';
import Sidebar from '../../Components/SidebarDIO';
import Wallet from "../../Components/Wallet";




const Idea = () => {

    return (
    <div className="container">
        <Sidebar />
        <div className="main-content">
        <Wallet  />
        <div className="execution-board">
          <h1>DIO Thanks and Tip</h1>
          </div>

        <div className='actions'>
        Push an Idea
        </div>
        </div>
    </div>
    );
}

export default Idea;