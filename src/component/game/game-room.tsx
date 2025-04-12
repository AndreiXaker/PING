import { Card, InputNumber, Space, Typography } from "antd";
import MagicCard from "./Card/magicCard";
import GameTimer from "./game-timer/gameTimer";
import { useWebSocketStore } from "../../hooks/websocket";
import { usersGame } from "../../api/api";
import { useState } from "react";

interface GameRoomProps {
  maxPlayers: number;
  gameName: string;
}

export default function GameRoom({ maxPlayers, gameName }: GameRoomProps) {
  const { games } = useWebSocketStore();
  const game = games.find((g) => g.game_name === gameName);
  const session = game?.sessions.find(session => session.players > 0) ?? game?.sessions[0]; 
  const coinSymbol = game?.coin_symbol || "";
  const timeLeft = session?.remaining_time ?? 0; 
  const players = session?.players ?? 0;

  const [betAmount, setBetAmount] = useState<number>(0.1);

  const handleCardClick = async (cellNum: number) => {
    if (!session) return;

    try {
      const data = {
        cell_num: [cellNum], 
        bet_amount: betAmount,
        session_id: Number(session.session_id),
      };

      const response = await usersGame(game!.game_id, data);
      console.log("Игрок подключен к игре:", response);
    } catch (error) {
      console.error("Ошибка при подключении к игре:", error);
    }
  };

  return (
    <Card bordered={false} style={{ backgroundColor: "#1F2937", color: "white" }}>
      <Card.Meta
        title={<Typography.Title level={4} style={{ color: "white" }}>{gameName}</Typography.Title>}
        description={
          <div>
            <Typography.Text style={{ color: "gray", marginRight: 8 }}> Ставка {coinSymbol}:</Typography.Text>
            <InputNumber 
              min={0.01}
              step={0.01}
              value={betAmount}
              onChange={(value) => setBetAmount(Number(value))}
              style={{ width: 100 }}
            />
          </div>
        }
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
            <MagicCard 
              key={i} 
              number={i + 1} 
              onClick={() => handleCardClick(i + 1)} 
            />
          ))}
        </div>
      </Space>

      <div className="flex justify-center items-center mt-4 w-full">
        <GameTimer timeLeft={timeLeft} />
      </div>

      <Typography.Text style={{ display: "block", textAlign: "center", marginTop: "16px", color: "gray" }}>
        Игроков в комнате: {players} 
      </Typography.Text>
    </Card>
  );
}
