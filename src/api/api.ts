import axios from "axios";
import { useWebSocketStore } from "../hooks/websocket";

export interface SimpleTransaction {
  amount: string;
  coin: string;
  created_at: string;
}

export interface IGameData {
  cell_numbers: number[];
  bet_amount: number;
  session_id: number;
  coin_symbol: string;
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
    
    const activeSession = game.sessions.find((session) => session.players === 0); 
    return activeSession ? activeSession.session_id : null;
  }
  return null;
};

export const deposit = async ({coin} : { coin: string}) => {
    try {
      const response = await apiClient.post("api/v1/deposit/", {
        coin
      });
      return response.data;
    } catch (error) {
      throw new Error("Ошибка при пополнении баланса: " + error);
    }
};

// Получение баланса пользователя
export const checkBalance = async () => {
  try {
    const response = await apiClient.get("/api/v1/check_balance/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
};

//Ставки на игру пользователя
export const usersGame = async (game_id: string, data: IGameData) => {
  const session_id = data.session_id ?? getSessionIdForGame(game_id);

  // console.log("Отправляемые данные на сервер:", {
  //   session_id: data.session_id,
  //   bet_amount: data.bet_amount,
  //   cell_num: data.cell_num
  // });

  const response = await apiClient.post(`api/v1/join-game-session/${game_id}/`, {
    session_id,
    cell_numbers: data.cell_numbers,
    bet_amount: data.bet_amount,
    coin_symbol: data.coin_symbol,
  });

  return response.data;
};

// Ограничение ставки по криптовалюте
export const limitBet = async () => {
  try {
    const response = await axios.get("https://pinghub.online/api/v1/games/api/v1/coin-bet-limits/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
}
// Проигрыши пользователя
export const usersLoses = async () => {
  try {
    const response = await apiClient.get("api/v1/my-losses/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;

  }
}
// Победы пользователя
export const usersWins = async () => {
  try {
    const response = await apiClient.get("api/v1/my-wins/")
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
}

// Получение id пользователя
export const userLogin = async () => {
  try {
    const response = await userApi.get("api/v1/memo-phrase/")
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
      const response = await apiClient.post("api/v1/ton-transfer/", {
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

//QR код для пополнения средств
export const qrCode = async (): Promise<string | null> => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/qr/DOGS/', {
      responseType: 'blob', 
    });
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject; 
      reader.readAsDataURL(response.data);  
    });
  } catch (error) {
    throw new Error("Ошибка при получении qr кода: " + error);
  }
};

//Последние пополнения
export const getLastDeposits = async (): Promise<SimpleTransaction[] | null> => {
  try {
    const response = await apiClient.get("api/v1/last-deposits/");
    console.log("Deposits raw response:", response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((item: any) => ({
      amount: item.amount,
      coin: item.coin,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
};

//Последние выводы
export const getLastWithdrawals = async (): Promise<SimpleTransaction[] | null> => {
  try {
    const response = await apiClient.get("api/v1/last-withdrawals/");
    console.log("Deposits raw response:", response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((item: any) => ({
      amount: item.amount,
      coin: item.coin,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null;
  }
};

//Получение кошелька 
export const wallet = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE_URL + '/coins/WALLETE/contract/')
    return response.data
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return null
  };
}