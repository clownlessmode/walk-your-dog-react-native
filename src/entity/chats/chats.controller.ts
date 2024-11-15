import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatsService from "./chats.service";
import { ChatsCreateDto, ChatsCreateRo } from "./model/chats.interface";
import { AxiosError } from "axios";
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}
export const useChatsController = (id?: string) => {
    const queryClient = useQueryClient();
    const getChats = useQuery({
      queryKey: ['myChats', id],
      queryFn: () => ChatsService.getMyChats(id as string),
      enabled: !!id,
    });
    const getChat = useQuery({
        queryKey: ['chat', id],
        queryFn: () => ChatsService.getChat(id as string),
        enabled: !!id,
      });
      const postChat = useMutation<ChatsCreateRo, AxiosError<ApiError>, ChatsCreateDto>({
        mutationFn: ChatsService.createChat,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['chat'],
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
        chats: getChats.data,
        isLoading: getChats.isPending,
        messages: getChat.data,
        isLoadingMessages: getChat.isPending,
        createChat: postChat.mutateAsync,
        isLoadingCreateChat: postChat.isPending,

    }
}