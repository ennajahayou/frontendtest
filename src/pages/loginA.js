import React from 'react';
import "./loginA.css";
import thanksandtip from '../images/Thanksandtip.png';


const loginA = () => {
  const handleClick = () => {
    window.location.href = "/login";
    console.log('Le bouton a été cliqué !');
  };

  return (
    <div className='loginA'>
      <div >
      <img  className='logo' src={thanksandtip} alt="Description de l'image" />
      </div>
      <button className='login' onClick={handleClick}>Log In</button>
    </div>
  );
};

export default loginA;
