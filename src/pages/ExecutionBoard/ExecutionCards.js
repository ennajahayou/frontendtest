import ExecutionDone from "./ExecutionCards/ExecutionDone";
import ExecutionInProgress from "./ExecutionCards/ExecutionInProgress";
import ExecutionInReview from "./ExecutionCards/ExecutionInReview";
import ExecutionNotAssigned from "./ExecutionCards/ExecutionNotAssigned";
import ExecutionNotValidated from "./ExecutionCards/ExecutionNotValidated";

const ExecutionCards = ({
  execution,
  handleDropClick,
  handleThanksClick,
  droppedTaskIndex,
}) => {
  if (execution.ceo_validated === 0) {
    return <ExecutionNotValidated execution={execution} />;
  } else {
    switch (execution.status_) {
      case "Not assigned":
        return (
          <ExecutionNotAssigned
            execution={execution}
            handleDropClick={handleDropClick}
            handleThanksClick={handleThanksClick}
            droppedTaskIndex={droppedTaskIndex}
          />
        );
      case "In progress":
        return (
          <ExecutionInProgress
            execution={execution}
            handleDropClick={handleDropClick}
            handleThanksClick={handleThanksClick}
            droppedTaskIndex={droppedTaskIndex}
          />
        );
      case "In review":
        return (
          <ExecutionInReview
            execution={execution}
            handleDropClick={handleDropClick}
            handleThanksClick={handleThanksClick}
            droppedTaskIndex={droppedTaskIndex}
          />
        );
      case "Done":
        return (
          <ExecutionDone
            execution={execution}
            handleDropClick={handleDropClick}
            handleThanksClick={handleThanksClick}
            droppedTaskIndex={droppedTaskIndex}
          />
        );
      default:
        return <></>;
    }
  }

  // switch (execution.status_) {
  //   case "In progress":
  //     execution.status_ = "In progress";
  //     break;
  //   case "In review":
  //     execution.status_ = "In review";
  //     break;
  //   case "Done":
  //     execution.status_ = "Done";
  //     break;
  // }

  // return (
  //   <div className="execution" key={execution.id}>
  //     <div>
  //       <b>{execution.exec_description}</b>
  //     </div>
  //     <div>To do for the {formatDeadline}</div>
  //     <div>Status : {execution.status_}</div>
  //     <div className="buttons-container">
  //       <button
  //         className="accept-button"
  //         onClick={() => handleDropClick(execution.id)}
  //       >
  //         Drop
  //       </button>
  //       {droppedTaskIndex === execution.id && (
  //         <button
  //           className="thanks-button"
  //           onClick={() => {
  //             handleThanksClick(execution.id);
  //           }}
  //         >
  //           Get Your Thanks
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default ExecutionCards;
