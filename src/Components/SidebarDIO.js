import React, { useState, useEffect } from "react";
import { Link , useLocation} from "react-router-dom";
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

   const [activeSection, setActiveSection] = useState(null);
   const location = useLocation();

   useEffect(() => {
    const path = location.pathname;
    setActiveSection(path);
  }, [location]);

   useEffect(() => {
       fetch('/api/content')
           .then(response => response.json())
           .then(data => setContent(data))
           .catch(error => console.error('Error fetching data:', error));
   }, []);
   return (
  <div className="sidebar">
    <div className="sidebar-section-image">
    <Link to="/Homepage" onClick={() => {window.location.href = "/Homepage"; }}>
       <img className="image_bar" src={logo} alt="Logo"  />
    </Link>
    </div>
   <Link to="/DIO"  onClick={() => {window.location.href = "/DIO"; }} className={`sidebar-section-link ${activeSection === "/DIO" ? 'active' : ''}`}>
       <img className="icon" src={message} /><span>My Feed</span>
   </Link>
   <Link to="/ExecutionBoard" onClick={() => {window.location.href = "/ExecutionBoard"; }} className={`sidebar-section-link ${activeSection === "/ExecutionBoard" ? 'active' : ''}`}>
       <img src={story}  />My Work Board
   </Link>
    <Link to="/Idea" onClick={() => {window.location.href = "/Idea"; }} className={`sidebar-section-link ${activeSection === "/Idea" ? 'active' : ''}`}>
        <img src={idee}  />Push an Idea
    </Link>
    <Link to="/Co-opt" onClick={() => {window.location.href = "/Co-opt"; }} className={`sidebar-section-link ${activeSection === "/Co-opt" ? 'active' : ''}`}>
        <img src={poignee}  />Co-opt Talent
    </Link>
       <Link to="/Archives" onClick={() => {window.location.href = "/Archives"; }} className={`sidebar-section-link ${activeSection === "/Archives" ? 'active' : ''}`}>
        <img src={archiver}  />My Archives
        </Link>
    <Link to="/CEOprerogatives" onClick={() => {window.location.href = "/CEOprerogatives"; }} className={`sidebar-section-link ${activeSection === "/CEOprerogatives" ? 'active' : ''}`}>
       <img src={poignee}  />CEO Prerogatives 
    </Link>
    <div className="sidebar-section espace"></div>
    <button className="sidebar-section">
      <img/>My Settings
      </button>
  </div>
   )
};

export default Sidebar;
