import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";


import logo from '../images/logo.png';
import archiver from '../images/icones/archiver.png';
import idee from '../images/icones/idee.png';
import message from '../images/icones/message.png';
import poignee from '../images/icones/poignee-de-main.png';
import star from '../images/icones/star.png';
import story from '../images/icones/story-board.png';


function Sidebar  () {
   const [content, setContent] = useState([]);

   useEffect(() => {
       fetch('/api/content')
           .then(response => response.json())
           .then(data => setContent(data))
           .catch(error => console.error('Error fetching data:', error));
   }, []);
   return (
  <div className="sidebar">
    <div className="sidebar-section-image">
    <Link to="/Homepage">
    <img className="image_bar" src={logo} alt="Logo"  />
    </Link>
    </div>
    <button className="sidebar-section">
      <Link to="/DIO">
       <img className="icon" src={message} />My Feed
       </Link>
    </button>
    <button className="sidebar-section">
       <Link to="/ExecutionBoard">
       <img src={story}  />My Work Board
       </Link>
    </button>
    <button className="sidebar-section">
        <img src={idee}  />Push an Idea
    </button>
    <button className="sidebar-section">
        <img src={poignee}  />Co-opt Talent
    </button>
    <button className="sidebar-section">
       <Link to="/Archives">
        <img src={archiver}  />My Archives
        </Link>
    </button>
    <button className="sidebar-section">
       <img src={poignee}  />CEO Prerogatives 
    </button>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section"><img   />My Settings</button>
  </div>
   )
};

export default Sidebar;
