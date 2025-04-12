import { useMutation } from "react-query";
import { deposit } from "../api/api";

interface ApiError {
    message : string
}

export const useDepositMutation = (
  onSuccess: () => void,
 onError: (error: ApiError) => void) => {
  return useMutation(deposit, {
    onSuccess: onSuccess,
    onError: onError
  });
};
