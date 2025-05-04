import { useMutation } from "react-query";
import { usersGame, IGameData } from "../api/api"; 

interface UseGameMutationProps {
    game_id: string;
    data: IGameData;
  }

  
export const useJoinGame = () => {
  return useMutation(
    ({ game_id, data }: UseGameMutationProps) => usersGame(game_id, data),
    {
      onSuccess: (data) => {
        console.log("Успешно подключено к игре:", data);
      },
      onError: (error) => {
        console.error("Ошибка при подключении к игре:", error);
      },
    }
  );
};
