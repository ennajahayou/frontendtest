import { useState, useEffect } from 'react';

const useCountdown = (departSeconds ) => {
  const [timer, setTimer] = useState({
    hours: Math.floor(departSeconds / 3600),
    minutes: Math.floor((departSeconds % 3600) / 60),
    seconds: departSeconds % 60,
  });

  useEffect(() => {
    let interval;
    let startTime = localStorage.getItem('countdownStartTime');

    // Si le temps initial n'est pas dans le stockage local, l'initialiser
   
      startTime = Date.now();
      localStorage.setItem('countdownStartTime', startTime);

    const endTime = parseInt(startTime, 10) + departSeconds * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const remainingTime = Math.max(0, endTime - now) / 1000;

      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = Math.floor(remainingTime % 60);

      setTimer({
        hours,
        minutes,
        seconds,
      });

      if (remainingTime === 0) {
        clearInterval(interval);
      }
    };

    updateTimer();

    interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [departSeconds]);

  return timer;
};

export default useCountdown;
