import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateReviewDto } from './model/create-review.dto';
import { Review } from '@entity/users/model/user.interface';
import { AxiosError } from 'axios';
import ReviewService from './reviews.service';

interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}

export const useReviewController = (workerId?: string) => {
  const queryClient = useQueryClient();

  // Получение отзывов о работнике
  const getWorkerReviews = useQuery<Review[], AxiosError<ApiError>>({
    queryKey: ['workerReviews', workerId],
    queryFn: () => ReviewService.getWorkerReviews(workerId as string),
    enabled: !!workerId,
    refetchInterval: 5000, // Интервал обновления данных, при необходимости
  });

  // Создание нового отзыва
  const postReview = useMutation<Review, AxiosError<ApiError>, CreateReviewDto>(
    {
      mutationFn: ReviewService.createReview,
      onSuccess: () => {
        // Инвалидируем и обновляем кэш отзывов о работнике
        if (workerId) {
          queryClient.invalidateQueries({
            queryKey: ['workerReviews', workerId],
          });
        }
      },
      onError: (error: AxiosError<ApiError>) => {
        if (error.response && error.response.data) {
          const apiError = error.response.data;
          console.error('Произошла ошибка:', apiError.message);
        } else {
          console.error('Ошибка:', error.message);
        }
      },
    }
  );

  return {
    // Данные и состояние получения отзывов
    workerReviews: getWorkerReviews.data,
    isLoadingWorkerReviews: getWorkerReviews.isLoading,
    isErrorWorkerReviews: getWorkerReviews.isError,
    errorWorkerReviews: getWorkerReviews.error,

    // Функция для создания отзыва
    createReview: postReview.mutateAsync,
    isCreatingReview: postReview.isPending,
    isErrorCreatingReview: postReview.isError,
    errorCreatingReview: postReview.error,
  };
};
