import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatsService from "./chats.service";

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
    return {
        chats: getChats.data,
        isLoading: getChats.isPending,
        messages: getChat.data,
        isLoadingMessages: getChat.isPending,
    }
}