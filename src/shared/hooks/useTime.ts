import { useEffect, useState } from 'react';

const useTime = (startTimestamp: string | null = null) => {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    // Determine the starting time based on whether it's a timer or stopwatch
    const startTime = startTimestamp ? new Date(startTimestamp) : new Date();

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000); // difference in seconds

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      // Format time as hh:mm:ss
      setTime(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    // Initialize timer immediately and set interval
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [startTimestamp]);

  return { time };
};

export default useTime;
