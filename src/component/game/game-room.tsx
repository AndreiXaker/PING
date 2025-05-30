import { Card, Space, message, Modal } from 'antd';
import { useWebSocketStore } from '../../hooks/websocket';
import CardsList from './Card/CardList';
import GameTimer from './game-timer/gameTimer';
import PlayerCountCard from './Players/Players';
import { useGameStore } from '../../store/store';
import { usersGame, limitBet } from '../../api/api';
import { useState, useEffect } from 'react';
import './GameRoom.css';
import { FileQuestionIcon } from 'lucide-react';
import styled from 'styled-components';

export const ShinyTitle = styled.h4`
  font-size: 2em;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.3);
  background: #222 -webkit-gradient(
      linear,
      left top,
      right top,
      from(#222),
      to(#222),
      color-stop(0.5, #fff)
    ) 0 0 no-repeat;
  background-image: -webkit-linear-gradient(
    -40deg,
    transparent 0%,
    transparent 40%,
    #fff 50%,
    transparent 60%,
    transparent 100%
  );
  -webkit-background-clip: text;
  -webkit-background-size: 50px;
  -webkit-animation: shineAnim 5s infinite;
  @-webkit-keyframes shineAnim {
    0%, 10% {
      background-position: -200px;
    }
    20% {
      background-position: top left;
    }
    100% {
      background-position: 200px;
    }
  }
`;

interface GameRoomProps {
  maxPlayers: number;
  gameName: string;
}
interface BetLimit {
  coin: string;
  allowed_bets: string[];
}
export default function GameRoom({ maxPlayers, gameName }: GameRoomProps) {
  const { coinSymbol, betAmount, setBetAmount, betLimits, setBetLimits } = useGameStore();
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [selectedBetAmount] = useState<number | null>(null); 

  const { games } = useWebSocketStore();
  const game = games.find((g) => g.game_name === gameName)!;
  const session = game?.sessions.find((s) => s.players > 0) ?? game?.sessions[0];
  const players = session?.players ?? 0;
  const timeLeft = session?.remaining_time ?? 0;


  const helpLinks = [
    'https://telegra.ph/Opisanie-servisa-PING-05-06',
    'https://telegra.ph/Igra-na-9-yacheek-v-servise-PING-05-06',
    'https://telegra.ph/Opisanie-servisa-PING-igra-na-6-yacheek-05-06',
  ];
 

  useEffect(() => {
    const fetchBetLimits = async () => {
      try {
        const data = await limitBet();
        const limits: Record<string, string[]> = {};
        data.forEach((item : BetLimit) => {
          limits[item.coin] = item.allowed_bets;
        });
        setBetLimits(limits);  
      } catch (error) {
        console.error("Ошибка при получении лимитов ставок:", error);
      }
    };

    fetchBetLimits();

    
    const intervalId = setInterval(fetchBetLimits, 5 * 60 * 1000);

    
    return () => clearInterval(intervalId);
  }, [setBetLimits]);

  useEffect(() => {
  const coinLimit = selectedBetAmount ?? betLimits[coinSymbol]?.[0];

  if (betAmount === 0 && coinLimit) {
    setBetAmount(parseFloat(coinLimit.toString())); 
  }
  })
  
  

  const handleCardClick = (cellNum: number) => {
    if (selectedCells.includes(cellNum)) {
      message.warning(`Вы уже ставили на ячейку №${cellNum}`);
      return;
    }


    Modal.confirm({
      title: 'Подтверждение ставки',
      content: `Поставить ${betAmount} ${coinSymbol} на ячейку №${cellNum}?`,
      onOk: async () => {
        try {
          await usersGame(String(game.game_id), {
            cell_numbers: [cellNum],
            bet_amount: betAmount,
            session_id: Number(session.session_id),
            coin_symbol: coinSymbol,
          });
          message.success('Ставка размещена');
          setSelectedCells((prev) => [...prev, cellNum]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          message.error(err.response?.data?.error || err.message);
        }
      },
      okText: 'Поставить',
      cancelText: 'Отмена',
    });
  };

  return (
    <Card bordered={false} bodyStyle={{padding : 3}} className="game-room-card">
      <div className="flex items-center justify-between mb-4">
        <Card.Meta
          className='items-center flex gap-2'
          title={<ShinyTitle >{gameName}</ShinyTitle>}
        />
        <PlayerCountCard players={players} />
         <a
          href={helpLinks[gameName === 'G3ME' ? 0 : gameName === 'G6ME' ? 2 : 1]}
          className="question-icon"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FileQuestionIcon />
        </a>
      </div>
      <Space direction="vertical" className="flex justify-center">
        <CardsList maxPlayers={maxPlayers} onCardClick={handleCardClick}  />
      </Space>
      <div className="flex justify-center mt-4">
        <GameTimer timeLeft={timeLeft} />
      </div>
    </Card>
  );
}
