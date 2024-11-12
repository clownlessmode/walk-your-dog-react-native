import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { CreatePetRo } from './model/pet.dto';
import PetService from './pet.service';
import { Pet } from './model/pet.interface';
import axios, { AxiosError } from 'axios';
import { isLoading } from 'expo-font';
import { PetParameters, PetParametersDto } from './model/pet-parameters.interface';

interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
export const useAuthPetController = (id?: string) => {
  const queryClient = useQueryClient();
  const signUpPet = useMutation<Pet, AxiosError<ApiError>, FormData>({
    mutationFn: PetService.postSignUpPet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myPets'],
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
  const getPet = useQuery({
    queryKey: ['myPets', id],
    queryFn: () => PetService.getPets(id as string),
    enabled: !!id,
  });
  const deletePet = useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: PetService.deletePets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myPets'],
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
})
    const parametersPet = useMutation<Pet, AxiosError<ApiError>, PetParametersDto>({
      mutationKey: ['user', id],
      mutationFn: (dto: PetParametersDto) => PetService.putPets(id as string, dto),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['myPets'],
        });
        queryClient.invalidateQueries({
          queryKey: ['petService', id],
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
    myPets: getPet.data,
    isLoadingMyPets: getPet.isPending,
    signUpPet: signUpPet.mutateAsync,
    deletePet: deletePet.mutateAsync,
    error: signUpPet.error,
    isLoading: signUpPet.isPending,
    parametersPet: parametersPet.mutateAsync,
    isLoadingParameters: parametersPet.isPending,
  };
};
