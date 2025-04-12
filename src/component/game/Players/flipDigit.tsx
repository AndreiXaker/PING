import "./gameRoom.css";

interface FlippingNumbersProps {
  players: number; 
}

const FlippingNumbers = ({ players }: FlippingNumbersProps) => {
  // const { games } = useWebSocketStore();
  // const game = games.find((g) => g.game_id === gameId);
  // const session = game?.sessions[0]; 

  // const players = session?.players ?? 0;

  return (
    <div className="flipping-numbers">
      <div className="digit">
        <div className="container">
          <div className="nums nums-ten">
            {String(players)
              .padStart(2, "0") 
              .split("")
              .map((digit, index) => (
                <div key={index} className="num" data-num={digit}></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingNumbers;
