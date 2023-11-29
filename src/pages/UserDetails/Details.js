import { useEffect, useState } from "react";
import axios from "axios";
import ExecutionThanks from "./ExecutionThanks";

const Details = ({ user, setShowDetails }) => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/usersdetails/userdetails/user?userId=" +
          user.id
        // {
        //   params: {
        //     userId: userId,
        //   },
        // }
      )
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div className="user-details">
      <h2>Détail des thanks de {user.user_name}</h2>
      <ol>
        {userDetails.map((exec, index) => (
          <ExecutionThanks exec={exec} index={index} />
        ))}
      </ol>
      <button onClick={() => setShowDetails(false)}>Retour</button>
    </div>
  );
};

export default Details;
