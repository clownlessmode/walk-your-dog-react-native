
import { BalanceDto } from "./model/refill.interface";
import { AxiosError } from "axios";
import RefillService from "./refill.service";
import { QueryClient, useMutation } from "@tanstack/react-query";
interface ApiError {
    message: string[];
    error: string;
    statusCode: number;
  }
export const useRefillController = (id?: string) => {
    const queryClient = new QueryClient();
    const postBalance = useMutation<any, AxiosError<ApiError>, BalanceDto>({
        mutationFn:(data: BalanceDto) => RefillService.Balance(id as string, data),
        // onError: (error: AxiosError<ApiError>) => {
        //   if (error.response && error.response.data) {
        //     const apiError = error.response.data;
        //     console.error('Произошла ошибка:', apiError.message);
        //   } else {
        //     console.error('Ошибка:', error.message);
        //   }
        // },
      });
      return {
        refill: postBalance.mutateAsync,
        loadingRefil: postBalance.isPending
      }
}