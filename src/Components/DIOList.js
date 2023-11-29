import React from "react";
import { Link } from "react-router-dom";
import "./DIOList.css";

const DIOList = ({ dioData }) => (
  <div className="dio-list">
    {dioData.map((dio, index) => (
      <div key={dio.id} className="dio-item">
        <div className="dio-text">
          <h3>{dio.name}</h3>
          <p>{dio.description}</p>
        </div>
        <Link to="/DIO">
          <button className="participate-button">PUSH</button>
        </Link>
      </div>
    ))}
  </div>
);

export default DIOList;
