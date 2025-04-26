import axios from "axios";
import { useWebSocketStore } from "../hooks/websocket";

export interface IGameData {
  cell_num: number[];
  bet_amount: number;
  session_id: number;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    headers: {
      "Content-Type": "application/json",
    },
  });

const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
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
  const session_id = getSessionIdForGame(game_id);

  // console.log("Отправляемые данные на сервер:", {
  //   session_id: data.session_id,
  //   bet_amount: data.bet_amount,
  //   cell_num: data.cell_num
  // });

  const response = await apiClient.post(`/join-game-session/${game_id}/`, {
    session_id,
    cell_numbers: data.cell_num,
    bet_amount: data.bet_amount
  });

  return response.data;
};

// Ограничение ставки по криптовалюте
export const limitBet = async () => {
  try {
    const response = await publicApi.get("/coin-bet-limits/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
}
// Проигрыши пользователя
export const usersLoses = async () => {
  try {
    const response = await apiClient.get("/my-losses/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;

  }
}
// Победы пользователя
export const usersWins = async () => {
  try {
    const response = await apiClient.get("/my-wins/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
}

// Получение id пользователя
export const userLogin = async () => {
  try {
    const response = await userApi.get("/memo-phrase/")
    return response.data.memo_phrase;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
  }

// Снятие средств
export const transfer = async ({amount, currency, wallet_address,} : 
  {amount: string, currency: string, wallet_address: string}) => {
    try {
      const response = await apiClient.post("/ton-transfer/", {
        type : "ton_transfer",
        amount,
        currency,
        wallet_address,
      });
      return response.data;
    } catch (error) {
      throw new Error("Ошибка при снятии баланса: " + error);
    }
  }


