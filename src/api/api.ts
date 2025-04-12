import axios from "axios";
import { useWebSocketStore } from "../hooks/websocket";

export interface IGameData {
  cell_num: number[];
  bet_amount: number;
  session_id: number;
}

// const games = [
//   { game_id: '3506bc39-f636-403b-88fc-cc88a69185d2' },
//   { game_id: 'e66b5667-4c57-4253-a185-be38aea52996' },
//   { game_id: 'c7179aa6-d645-45a3-a5a9-f2a0c35f3f72' },
// ];

const apiClient = axios.create({
    baseURL: "http://localhost:8000/games/api/v1", 
    headers: {
      "Content-Type": "application/json",
    },
  });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const getSessionIdForGame = (game_id: string) => {
  const game = useWebSocketStore.getState().games.find((game) => game.game_id === game_id);
  if (game) {
    
    const activeSession = game.sessions.find((session) => session.players === 0); // или другой критерий
    return activeSession ? activeSession.session_id : null;
  }
  return null;
};

export const deposit = async ({coin,amount} : { coin: string; amount: string }) => {
    try {
      const response = await apiClient.post("/deposit/", {
        coin,
        amount,
      });
      return response.data;
    } catch (error) {
      throw new Error("Ошибка при пополнении баланса: " + error);
    }
};


export const checkBalance = async () => {
  try {
    const response = await apiClient.get("/check_balance/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
};

export const usersGame = async (game_id: string, data: IGameData) => {
  try {
   
    const session_id = getSessionIdForGame(game_id);

    if (!session_id) {
      throw new Error(`Игра с game_id ${game_id} не найдена`);
    }

    console.log("Отправляемые данные на сервер:", {
      session_id: data.session_id,
      bet_amount: data.bet_amount,
      cell_num: data.cell_num
    });

    const response = await apiClient.post(`/join-game-session/${game_id}/`, {
      session_id, 
      cell_numbers: data.cell_num,
      bet_amount: data.bet_amount
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при подключении к игре:", error);
    throw new Error("Ошибка при подключении к игре: " + error);
  }
};

