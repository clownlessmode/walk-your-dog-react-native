import { useQuery, useQueryClient } from "@tanstack/react-query";
import PaymentsService from "./payments.service";

interface ApiError {
    message: string[];
    error: string;
    statusCode: number;
  }
  export const usePaymentsController = (id?: string) => {
    const queryClient = useQueryClient();
    const getAbonements = useQuery({
      queryKey: ['payments', id],
      queryFn: () => PaymentsService.getPaymentsHistory(id as string),
      enabled: !!id,
    });
    return {
        paymentsHistory: getAbonements.data,
        isPaymentsLoading: getAbonements.isLoading,
    }
}