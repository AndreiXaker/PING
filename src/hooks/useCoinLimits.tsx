import { useQuery } from "react-query";
import { limitBet } from "../api/api";

interface CoinLimit {
  coin: string;
  allowed_bets: number[];
}

export const useCoinLimits = () => {
    return useQuery<CoinLimit[]>(["coin-limits"], limitBet)
}
