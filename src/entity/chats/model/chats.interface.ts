import { Chat, Message, User } from "@entity/users/model/user.interface";
import BaseEntity from "@shared/types/base-entity.interface";

export interface ChatsCreateDto {
    user1Id: string;
    user2Id: string;
}

export interface ChatRo extends BaseEntity {
    user1: User;
    user2: User;
    messages: Message[];
  }

export interface ChatsCreateRo extends BaseEntity {
    user1Id: string; // ID первого пользователя
  user2Id: string;
}

interface User1 extends BaseEntity {
    user1: Chat[]
}

interface User2 extends BaseEntity {
    user2: Chat[]
}