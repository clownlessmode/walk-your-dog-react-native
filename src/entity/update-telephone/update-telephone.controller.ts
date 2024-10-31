import {
    useQueryClient,
    useQuery,
    useMutation,
    UseMutationResult,
  } from "@tanstack/react-query";
import { UpdateTelephoneDto, UpdateTelephoneRo, UpdateUserDto, UpdateUserRo } from "./model/update-telephone.interface";
import UpdateTelephoneService from "./update-telephone.service";
  
  export const useUpdateController = (id?: string) => {
    const queryClient = useQueryClient();
    const verifyCode = useMutation<UpdateTelephoneRo, Error, UpdateTelephoneDto>({
      mutationFn: UpdateTelephoneService.postUpdateTelephone,
    });
    const updateUser = useMutation<UpdateUserRo, Error, UpdateUserDto>({
      mutationKey: ['user', id],
      mutationFn: (dto: UpdateUserDto) => UpdateTelephoneService.patchUpdateUser(id as string, dto),
      onSuccess: (data) => {
        queryClient.setQueryData(['user', id], data.meta);
      },
      onError: (error) => {
        console.error('Ошибка при обновлении пользователя:', error);
      },
    });
  
    return {
      updateUser: updateUser.mutateAsync,
      verifyCode: verifyCode.mutateAsync,
      error: verifyCode.error,
      isAuthLoading: verifyCode.isPending
    };
  };
  