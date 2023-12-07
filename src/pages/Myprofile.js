import React from 'react';
import "./loginA.css";
import thanksandtip from '../images/Thanksandtip.png';
import Sidebar from "../Components/Sidebarhomepage";


const Myprofile = () => {
  const handleClick = () => {
    window.location.href = "/login";
    console.log('Le bouton a été cliqué !');
  };

  return (
    <div className='loginA'>
    <Sidebar />
    <div className='main-content'>
      <button className='deconnexion' onClick={handleClick}>Déconnexion</button>
      </div>
    </div>
  );
};

export default Myprofile;