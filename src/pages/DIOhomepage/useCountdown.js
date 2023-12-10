// useCountdown.js
import { useState, useEffect } from 'react';

const useCountdown = (departHours = 24) => {
  const [timer, setTimer] = useState({
    hours: departHours,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval;
    let startTime = localStorage.getItem('countdownStartTime');

    // Si le temps initial n'est pas dans le stockage local, l'initialiser
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem('countdownStartTime', startTime);
    }

    const endTime = parseInt(startTime, 10) + departHours * 3600 * 1000;
  
    const updateTimer = () => {
      const now = Date.now();
      const remainingTime = Math.max(0, endTime - now);

      const hours = Math.floor(remainingTime / (3600 * 1000));
      const minutes = Math.floor((remainingTime % (3600 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      setTimer({
        hours,
        minutes,
        seconds,
      });

      if (remainingTime === 0) {
        clearInterval(interval);
      }
    };

    updateTimer(); // Mettez à jour immédiatement pour éviter un délai d'affichage initial

    interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [departHours]);

  return timer;
};

export default useCountdown;
