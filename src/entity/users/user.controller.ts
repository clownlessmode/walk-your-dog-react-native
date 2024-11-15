import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "./user.service";
import useUserStore from "./user.store";


export const useUserController = () => {
    const queryClient = useQueryClient();
    const { user, setUser } = useUserStore(); // Достаем пользователя из стора
    const id = user?.id;

    const getUser = useQuery({
      queryKey: ['user', id],
      queryFn: () => UserService.getUser(id as string),
      enabled: !!id,
    });
    const deleteUser = useMutation({
      mutationFn: UserService.deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      },
    });

    const refetchUser = async () => {
        if (id) {
          const user = await queryClient.fetchQuery({
            queryKey: ['user', id],
            queryFn: () => UserService.getUser(id),
          });
          return user;
        }
      };

    return {
        getMe: refetchUser,
        userInfo: getUser.data,
        deleteUser: deleteUser.mutateAsync,
    }
};
