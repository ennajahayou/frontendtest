import React, { useState } from 'react';

import { useContext } from 'react';
import { TasksContext } from '../TasksContext';

import './Settings.css';
import Sidebar from '../../Components/SidebarDIO';
import Wallet from "../../Components/Wallet";




const Settings = () => {

    return (
    <div className="container">
        <Sidebar />
        <div className="main-content">
        <Wallet  />
        <div className="execution-board">
          <h1>DIO Thanks and Tip</h1>
          </div>

        <div className='actions'>
        Settings
        </div>
        </div>
    </div>
    );
}

export default Settings;