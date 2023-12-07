import React from "react";
import { Link } from "react-router-dom";
import "./Wallet.css";
import logo5 from "../images/logo5.png";
import { useEffect, useState } from 'react';
import axios from 'axios';




 const Wallet = () => {
  /*
  const userId = localStorage.getItem('userId'); // Récupère le userId depuis le localStorage
  const [totalThanks, setTotalThanks] = useState(0);

  useEffect(() => {
    const fetchTotalThanks = async () => {
      try {
        //console.log('URL:', `${process.env.REACT_APP_BACKEND_URL}/getthanks/${userId}`);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getthanks/${userId}`);
        //const response = await axios.get(process.env.REACT_APP_BACKEND_URL +  '/getthanks/${userId}');
        setTotalThanks(response.data.totalThanks);
        console.log(response.data.totalThanks);
      } catch (error) {
        console.error('Erreur lors de la récupération des thanks depuis le backend', error);
      }
    };

    if (userId) {
      fetchTotalThanks(); // Appelle la fonction seulement si userId est défini
    }
  }, [userId]);*/
  return (
  <div className="wallet-list">
  <div >
      <div  className="wallet-item">
          <h4> Value of my tip  </h4>
          <h4> Total Thanks</h4>
          <h4> Next revenu</h4>
      </div>
      <div className="row-container">
              <div className="row-item">1 429 690€ </div>
              <div className="row-item"> 168 593<img className="symbole_th" src={logo5} /></div>
              <div className="row-item">8 200€</div>
          </div>
  </div>
  <div>
    <h4>More</h4>
  <button className="arrow-button">➡</button>
  </div>
  </div>
   );
 };

export default Wallet;