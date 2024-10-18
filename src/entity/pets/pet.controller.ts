import { useQueryClient, useMutation } from '@tanstack/react-query';
import { CreatePetRo } from './model/pet.dto';
import PetService from './pet.service';
import { Pet } from './model/pet.interface';
import axios, { AxiosError } from 'axios';
import { isLoading } from 'expo-font';

interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
export const useAuthPetController = () => {
  const queryClient = useQueryClient();
  const signUpPet = useMutation<Pet, AxiosError<ApiError>, FormData>({
    mutationFn: PetService.postSignUpPet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pet'],
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
    signUpPet: signUpPet.mutateAsync,
    error: signUpPet.error,
    isLoading: signUpPet.isPending
  };
};
