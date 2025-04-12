import { useEffect, useState } from "react";
import "./gameTimer.css";

interface GameTimerProps {
  timeLeft: number;
}

export default function GameTimer({ timeLeft }: GameTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeLeft);

  useEffect(() => {
    setRemainingTime(timeLeft); 
  }, [timeLeft]);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="countdown">
      <div className="countdown-timer">
        <div className="hours"><span>{String(hours).padStart(2, "0")}</span></div>
        <div className="minutes"><span>{String(minutes).padStart(2, "0")}</span></div>
        <div className="seconds"><span>{String(seconds).padStart(2, "0")}</span></div>
      </div>
    </div>
  );
}
