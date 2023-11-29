import React, { useState, useEffect } from "react";
import Details from "./Details";
import Sidebar from "../../Components/Sidebar";
import "../login.css";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/usersdetails/userdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div className="App">
      <Sidebar />
      {showDetails ? (
        <Details user={userInformation} setShowDetails={setShowDetails} />
      ) : (
        <div className="user-details">
          <h2>Liste des utilisateurs triée par les Thanks :</h2>
          <ol>
            {userDetails.map((user, index) => (
              <li
                key={index}
                onClick={() => {
                  setShowDetails(true);
                  setUserInformation(user);
                }}
              >
                Talents: {user.user_name} - Thanks: {user.thanks}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
export default UserDetails;
