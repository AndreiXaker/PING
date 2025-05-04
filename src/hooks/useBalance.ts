import { useQuery } from "react-query";
import { checkBalance } from "../api/api";

interface Balance {
  coin: string;
  amount: string;
  locked_amount: string;
}

interface BalanceData {
  balances: Balance[];
}

export const useBalance = () => {

  return useQuery<BalanceData,Error>("balances", checkBalance, {
    refetchInterval : 2000,
    refetchOnWindowFocus : true  
  });
};
