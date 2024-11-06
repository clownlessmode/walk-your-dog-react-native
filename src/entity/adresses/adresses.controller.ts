import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdressesDto, AdressesRo } from './model/adresses.interface';
import AdressesService from './adresses.service';
import { isLoading } from 'expo-font';


export const useAdressesController = () => {
  const queryClient = useQueryClient();
  const adresses = useMutation<AdressesRo, Error, AdressesDto>({
    mutationFn: AdressesService.postAdresses,
  });

  return {
    createAdresses: adresses.mutateAsync,
    isLoading: adresses.isPending
  };
};
