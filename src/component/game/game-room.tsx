import { Card, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import FlippingNumbers from "./Players/flipDigit";
import MagicCard from "./Card/magicCard";
import GameTimer from "./game-timer/gameTimer";

interface GameRoomProps {
  maxPlayers: number;
}

export default function GameRoom({ maxPlayers }: GameRoomProps) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => (time > 0 ? time - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card bordered={false} style={{ backgroundColor: "#1F2937", color: "white" }}>
      <Card.Meta
        title={<Typography.Title level={4} style={{ color: "white" }}>Ставка: X BTC</Typography.Title>}
        description={<Typography.Text style={{ color: "gray" }}>Возможный профит: X BTC</Typography.Text>}
      />
  
      <Space direction="vertical" style={{ width: "100%", marginTop: "16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.ceil(maxPlayers / 3)}, minmax(50px, 150px))`,
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: maxPlayers }).map((_, i) => (
            <MagicCard key={i} number={i + 1} />
          ))}
        </div>
      </Space>
  
      {/* Таймер теперь идет перед текстом "Игроков в комнате" */}
      <GameTimer timeLeft={timeLeft} />
  
      <Typography.Text style={{ display: "block", textAlign: "center", marginTop: "16px", color: "gray" }}>
        Игроков в комнате: <FlippingNumbers />
      </Typography.Text>
    </Card>
  );
  
}
