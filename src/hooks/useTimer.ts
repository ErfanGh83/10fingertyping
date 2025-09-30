import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState<number>(0); // in ms
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // start the timer
  const start = () => {
    if (!isActive) setIsActive(true);
  };

  // stop the timer
  const stop = () => setIsActive(false);

  // reset the timer
  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  useEffect(() => {
    if (isActive) {
      const startTime = Date.now() - time; // continue from current time
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // update every 10ms (0.01s)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // formatted values (optional)
  const ms = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000);

  return { time, ms, seconds, minutes, start, stop, reset };
};
