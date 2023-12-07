import React from 'react';
import "./loginA.css";
import thanksandtip from '../images/Thanksandtip.png';
import Sidebar from "../Components/Sidebarhomepage";
import Wallet from "../Components/Wallet";


const Myprofile = () => {
  const handleClick = () => {
    window.location.href = "/login";
    console.log('Le bouton a été cliqué !');
  };

  return (
        <div className="container">
        <Sidebar />
        <div className="main-content">
        <Wallet  />
        <div className="execution-board">
        <button className="deconnexion" onClick={handleClick}>Déconnexion</button>
          </div>

        </div>
    </div>
  );
};

export default Myprofile;