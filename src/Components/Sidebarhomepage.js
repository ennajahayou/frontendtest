import React from "react";
import { Link } from "react-router-dom";
import "./Sidebarhomepage.css";

import personna from '../images/icones/personna.png';


import logo from "../images/logo.png";
const userName = localStorage.getItem("userName");
const Sidebar = () => (
  <div className="sidebarhome">
    <div className="sidebar-section-image">
    <Link to="/Homepage">
    <img className="image_bar" src={logo} alt="Logo"  />
    </Link> 
    </div>
    <button className="sidebar-section"><span>My DIOs</span></button>
    <button className="sidebar-section"><span>Create a new DIO</span></button>
    <button className="sidebar-section"><span>Discover DIOs</span></button>



    <button className="sidebar-section"><span>Invite New Member</span></button>
     
    <button className="sidebar-section">
    <Link to="/Myprofile" style={{ borderBottom: 'none', fontSize: '80%', width: '18vw', wordWrap: 'break-word' }}>
    <img src={personna} alt="Profile" />
     {userName}
    </Link>
    </button>
  </div>
);

export default Sidebar;
