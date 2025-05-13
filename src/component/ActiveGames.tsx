import { useWebSocketStore } from '../hooks/websocket';

const ActiveGames = () => {
  const { games } = useWebSocketStore();
  
  const activeGames = games.filter(game => 
    game.sessions.length > 0 && game.sessions.some(session => session.remaining_time > 10)
  );

  return (
    <div className="rounded-lg bg-gray-800/50 p-4 mt-6">
      <h2 className="text-lg font-semibold text-white">Действующие игры</h2>
      <div className="mt-4">
        {activeGames.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {activeGames.map((game, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                  <h3 className="text-white font-bold text-lg">{game.game_name}</h3>
                  <p className="text-gray-400 text-sm">
                    Валюты: {Array.isArray(game.coin_symbols) ? game.coin_symbols.join(', ') : 'Нет валют'}
                  </p>
                  <p className="text-gray-400 text-sm">Количество клеток: {game.cell_count}</p>
                  
                  {game.sessions.length > 0 && game.sessions.map((session, idx) => (
                    <div key={idx} className="mt-2">
                      <p className="text-gray-400 text-sm">Оставшееся время: {session.remaining_time} сек</p>
                      <p className="text-gray-400 text-sm">Игроков: {session.players}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Нет действующих игр.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveGames;
