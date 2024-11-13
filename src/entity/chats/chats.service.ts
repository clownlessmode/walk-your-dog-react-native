import { Chat, Message } from "@entity/users/model/user.interface";
import { baseApi } from "../../shared/api/base.api";

class ChatsService {
  static async getMyChats(id: string): Promise<Chat[]> {
    const response = await baseApi.get<Chat[]>(`chats/user/${id}`);
    return response.data;
  }
  static async getChat(id: string): Promise<Message[]> {
    const response = await baseApi.get<Message[]>(`messages/${id}`);
    return response.data;
  }
}

export default ChatsService;
