import './gameTimer.css';

interface GameTimerProps {
  timeLeft: number;
}

export default function GameTimer({ timeLeft }: GameTimerProps) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="countdown">
      <div className="countdown-timer">
        <div className="hours"><span>{String(hours).padStart(2, '0')}</span></div>
        <div className="minutes"><span>{String(minutes).padStart(2, '0')}</span></div>
        <div className="seconds"><span>{String(seconds).padStart(2, '0')}</span></div>
      </div>
    </div>
  );
}
