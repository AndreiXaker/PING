import { useState, useEffect } from 'react'
import { Clock, PlayCircle } from 'lucide-react'
import { Button } from './ui/Button'
import ping from "../component/ui/ping.gif";
import { useWebSocketStore } from '../hooks/websocket';
import { userLogin } from '../api/api';
 // Импортируем функцию для получения мемофразы

export default function LeftSidebar() {
  const { games } = useWebSocketStore();
  const [memoPhrase, setMemoPhrase] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchMemoPhrase = async () => {
      const phrase = await userLogin();
      if (phrase) {
        setMemoPhrase(phrase);
      }
    };

    fetchMemoPhrase();
  }, [])

  const finishingGames = games.flatMap(game =>
    game.sessions.filter(session => session.remaining_time <= 10).map(session => ({
      gameName: game.game_name,
      remainingTime: session.remaining_time,
      sessionId: session.session_id
    }))
  );

  const newGames = games.filter(game =>
    game.sessions.length === 0 || game.sessions.every(session => session.remaining_time > 10)
  );

  return (
    <div className="w-70 border-r border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
      <nav className="space-y-4">
        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <div className="flex flex-1">
            <img src={ping} alt="loading..." />
          </div>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
        {memoPhrase ? (
          <p className="text-lg text-white font-bold text-center">Ваш id: {memoPhrase}</p>
        ) : (
          <Button
            className="text-lg text-white font-bold text-center"
            onClick={() => window.location.href = "https://pingapp.tech/users/telegram/redirect/"}
          >
            LOGIN
          </Button>
        )}
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4">
          <h1 className="mb-2 font-semibold text-gray-400">Последние действия</h1>
          <div className="space-y-2">
            <Button className='flex text-lg items-center'>
              <Clock className="mr-2 h-4 w-4" size={20} />
              Последние пополнения
            </Button>
            <Button className='flex text-lg items-center'>
              <PlayCircle className="mr-2 h-4 w-4" size={20} />
              Последние снятия
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <p className='text-lg text-white font-bold text-center'>Завершаются</p>
          {finishingGames.length > 0 ? (
            <div className="space-y-2 mt-2">
              {finishingGames.map((game, index) => (
                <Button key={index} className="flex text-lg items-center">
                  {game.gameName} - {game.remainingTime} сек
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Нет заканчивающихся игр.</p>
          )}
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4">
          <p className='text-lg text-white font-bold text-center'>Новые</p>
          {newGames.length > 0 ? (
            <div className="space-y-2 mt-2">
              {newGames.map((game, index) => (
                <Button key={index} className="flex text-lg items-center">
                  {game.game_name}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Нет новых игр.</p>
          )}
        </div>

      </nav>
    </div>
  );
}
