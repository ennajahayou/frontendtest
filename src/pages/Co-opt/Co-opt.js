import React, { useState } from 'react';

import { useContext } from 'react';
import { TasksContext } from '../TasksContext';

import './Co-opt.css';
import Sidebar from '../../Components/SidebarDIO';
import Wallet from "../../Components/Wallet";




const Coopt = () => {

    return (
    <div className="container">
        <Sidebar />
        <div className="main-content">
        <Wallet  />
        <div className="execution-board">
          <h1>DIO Thanks and Tip</h1>
          </div>

        <div className='actions'>
        Co-opt
        </div>
        </div>
    </div>
    );
}

export default Coopt;