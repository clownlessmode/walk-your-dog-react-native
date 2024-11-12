import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdressesDto, AdressesRo, UpdateAddressDto } from './model/adresses.interface';
import AdressesService from './adresses.service';
import { isLoading } from 'expo-font';
import useUserStore from '@entity/users/user.store';

export const useAdressesController = (id?: string) => {
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const adresses = useMutation<AdressesRo, Error, AdressesDto>({
    mutationFn: AdressesService.postAdresses,
    onSuccess: (response) => {
      useUserStore.setState((state) => ({
        user: state.user
            ? {
                  ...state.user,
                  meta: state.user.meta
                      ? {
                            ...state.user.meta,
                            addresses: [response, ...state.user.meta.addresses.slice(1)],
                        }
                      : state.user.meta,
              }
            : state.user,
    }));
    },
    
  });
  const updateAddress = useMutation<AdressesRo, Error, UpdateAddressDto>({
    mutationKey: ['address', id],
    mutationFn: (dto: UpdateAddressDto) => AdressesService.patchAdresses(id as string, dto),
    onError: (error) => {
      console.error('Ошибка при обновлении пользователя:', error);
    },
  });
  return {
    createAdresses: adresses.mutateAsync,
    isLoading: adresses.isPending,
    updateAddress: updateAddress.mutateAsync,
    isUpdateLoading: updateAddress.isPending,
  };
};
