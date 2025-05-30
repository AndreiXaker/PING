import { useState, useEffect } from 'react'
import { Clock, PlayCircle } from 'lucide-react'
import { Button } from './ui/Button'
import ping from "../component/ui/ping.gif";
import { useWebSocketStore } from '../hooks/websocket';
import { userLogin,getLastDeposits,getLastWithdrawals, SimpleTransaction } from '../api/api';
import { ShinyTitle } from './game/game-room';


export default function LeftSidebar() {
  const { games } = useWebSocketStore();
  const [memoPhrase, setMemoPhrase] = useState<string | null>(null);
  const [lastDeposits, setLastDeposits] = useState<SimpleTransaction[]>([]);
  const [lastWithdrawals, setLastWithdrawals] = useState<SimpleTransaction[]>([]);

  useEffect(() => {
  const fetchMemoPhrase = async () => {
    const phrase = await userLogin();
    if (phrase) setMemoPhrase(phrase);
  };
  const fetchTransactions = async () => {
    const deposits = await getLastDeposits();
    const withdrawals = await getLastWithdrawals();
    console.log(deposits)
    console.log(withdrawals)
    if (deposits) setLastDeposits(deposits);
    if (withdrawals) setLastWithdrawals(withdrawals);
  };
  fetchMemoPhrase();
  fetchTransactions();
}, []);

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
          <p className="text-lg text-white font-bold text-center">Ваша мемофраза: <ShinyTitle>{memoPhrase}</ShinyTitle></p>
        ) : (
          <Button
            className="text-lg text-white font-bold text-center"
            onClick={() => window.location.href = import.meta.env.VITE_REGISTER_URL}
          >
            LOGIN
          </Button>
        )}
        </div>
        <div className="rounded-lg bg-gray-800/50 p-4">
          <h1 className="mb-2 font-semibold text-gray-400 flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Последние пополнения
          </h1>
          <div className="space-y-1 text-sm text-white">
            {lastDeposits.length > 0 ? (
              lastDeposits.map((item, index) => (
                <p key={index}>
                  {item.amount} {item.coin} — {new Date(item.created_at).toLocaleTimeString()}
                </p>
              ))
            ) : (
              <p className="text-gray-400">Нет пополнений.</p>
            )}
          </div>
        </div>

        
        <div className="rounded-lg bg-gray-800/50 p-4">
          <h1 className="mb-2 font-semibold text-gray-400 flex items-center">
            <PlayCircle className="mr-2 h-4 w-4" />
            Последние снятия
          </h1>
          <div className="space-y-1 text-sm text-white">
            {lastWithdrawals.length > 0 ? (
              lastWithdrawals.map((item, index) => (
                <p key={index}>
                  {item.amount} {item.coin} — {new Date(item.created_at).toLocaleTimeString()}
                </p>
              ))
            ) : (
              <p className="text-gray-400">Нет снятий.</p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4 flex flex-col items-center">
          <p className='text-lg text-white font-bold text-center'>Завершаются</p>
          {finishingGames.length > 0 ? (
            <div className="space-y-6 mt-2">
              {finishingGames.map((game, index) => (
                <div key={index} className="flex text-lg items-center">
                  <ShinyTitle>{game.gameName}</ShinyTitle>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Нет заканчивающихся игр.</p>
          )}
        </div>

        <div className="rounded-lg bg-gray-800/50 p-4">
          <p className='text-lg text-white font-bold text-center'>Новые</p>
          {newGames.length > 0 ? (
            <div className="space-y-6 mt-2 text-center items-center">
              {newGames.map((game, index) => (
                <div key={index} className="text-lg items-center ">
                  <ShinyTitle>{game.game_name}</ShinyTitle>
                </div>
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
