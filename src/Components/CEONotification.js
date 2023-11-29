import "./CEONotification.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CEONotification = () => {
  const [numberNotifications, setNumberNotifications] = useState(0);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/ceoprofil/notifications")
      .then((res) => {
        setNumberNotifications(res.data[0].notifications);
      });
  });

  if (numberNotifications > 0) {
    return (
      <div className="notification">
        <span className="notification-number">{numberNotifications}</span>
      </div>
    );
  }
  return <div></div>;
};

export default CEONotification;
