import "./ExecutionBoard.css";

const StarRating = ({ label, rating, onChange }) => {
  return (
    <div className="rating-section">
      <p>{label}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{ cursor: "pointer", fontSize: "35px", margin: "10px" }}
        >
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
