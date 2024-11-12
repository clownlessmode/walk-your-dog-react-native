import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AbonementsService from './abonements.service';
import { AxiosError } from 'axios';
import { AbonementBuyDto, AbonementBuyRo } from './modal/abonements.interface';
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
export const useAbonementsController = (id?: string) => {
  const queryClient = useQueryClient();
  const getAbonements = useQuery({
    queryKey: ['myAbonements', id],
    queryFn: () => AbonementsService.getAbonementsUs(id as string),
    enabled: !!id,
  });
  const getAllAbonements = useQuery({
    queryKey: ['myAbonements'],
    queryFn: () => AbonementsService.getAllAbonementsUs(),
  });
  const getPrizes = useQuery({
    queryKey: ['prizes'],
    queryFn: () => AbonementsService.getPrizes(),
  });
  const postAbonements = useMutation<AbonementBuyRo, AxiosError<ApiError>, AbonementBuyDto>({
    mutationFn: AbonementsService.postAbonementsUs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myAbonements'],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response && error.response.data) {
        const apiError = error.response.data;
        console.error('Произошла ошибка:', apiError.message);
      } else {
        console.error('Ошибка:', error.message);
      }
    },
  });
  return {
    myAbonements: getAbonements.data,
    loadAbonements: getAbonements.isLoading,
    allAbonements: getAllAbonements.data,
    prizes: getPrizes.data,
    loadAllAbonements: getAllAbonements.isLoading,
    postAbonements: postAbonements.mutateAsync
  };
};
