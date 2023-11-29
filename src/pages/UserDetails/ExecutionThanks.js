import { useState, useEffect } from "react";
import axios from "axios";

const difficultyArray = ["Easy", "Challenging", "Hard", "Very Hard"];
const reactivityArray = [
  "Cool",
  "On the spot",
  "Over Expectations",
  "Prodigious",
];

const ExecutionThanks = ({ exec }) => {
  const [showReview, setShowReview] = useState(false);
  const [executionReviews, setExecutionReviews] = useState({});

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/usersdetails/ExecutionReviews?executionId=" +
          exec.id
      )
      .then((response) => {
        setExecutionReviews(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <li
      onClick={() => {
        setShowReview(!showReview);
      }}
    >
      <b>{exec.exec_description}</b> - Thanks: {exec.score_thanks}
      {showReview && (
        <>
          <div>
            <b>Self Review</b> : difficulty:{" "}
            {difficultyArray[executionReviews.selfReview[0].difficulty]},
            reactivity:{" "}
            {reactivityArray[executionReviews.selfReview[0].reactivity]}
          </div>
          <div>
            <b>CEO Review</b> : expectations:{" "}
            {executionReviews.ceoReview[0].expectations + 1}, reactivity:{" "}
            {reactivityArray[executionReviews.ceoReview[0].reactivity]}
          </div>
          <div>
            <b>Peer Reviews :</b>
            {executionReviews.peerReview.map((review, index) => (
              <div key={index}>
                expectations: {review.expectations + 1}, reactivity:{" "}
                {reactivityArray[review.reactivity]}
              </div>
            ))}
          </div>
        </>
      )}
    </li>
  );
};

export default ExecutionThanks;
