import { create } from "zustand";

interface GameSession {
  session_id: string;
  end_time: string;
  players: number;
  remaining_time: number;
}

interface Game {
  game_id: string;
  game_name: string;
  cell_count: number;
  coin_symbol : string;
  sessions: GameSession[];
}

interface WebSocketStore {
  games: Game[];
  playersCount: number;
  totalRemainingTime: number;
  getActiveSessionId: (game_id: string) => string | null; 
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => {  
  const socket = new WebSocket("wss://pingapp.tech/ws/active-games/");

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const games: Game[] = data.active_games;

      let playersCount = 0;
      let totalRemainingTime = 0;

      
      games.forEach((game) => {
        game.sessions.forEach((session) => {
          playersCount += session.players;
          totalRemainingTime += session.remaining_time;
        });
      });

      set({ games, playersCount, totalRemainingTime });
    } catch (error) {
      console.error("Ошибка парсинга WebSocket-сообщения", error);
    }
  };

  const getActiveSessionId = (game_id: string): string | null => {
    
    const state = get(); 
    const game = state.games.find((game) => game.game_id === game_id);
    if (!game) return null;

    
    const activeSession = game.sessions.find((session) => session.players === 0);
    return activeSession ? activeSession.session_id : null;
  };

  return { games: [], playersCount: 0, totalRemainingTime: 0, getActiveSessionId };
});
