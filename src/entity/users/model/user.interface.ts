import BaseEntity from '@shared/types/base-entity.interface';
import { Meta } from './meta.interface';
import { Balance } from '@entity/balance/model/balance.interface';
import { Pet } from '@entity/pets/model/pet.interface';
import { AbonementBuyRo } from '@entity/abonements/modal/abonements.interface';
import PetTypes from '@entity/pet-types/model/pet-types.interface';
import { Service } from '@entity/service/model/service.interface';

export interface User extends BaseEntity {
  meta: Meta;
  abonements: AbonementBuyRo[];
  refreshToken: string;
  balance: Balance;
  pets: Pet[];
  worker: Worker;
  messages: Message[];
  chatsAsUser1: Chat[];
  chatsAsUser2: Chat[];
  reviews: Review[];
}

export interface Worker extends BaseEntity {
  start: string;
  end: string;
  days: string[];
  petTypes: PetTypes[];
  services: Service[];
  reviews: Review[];
}

export interface Message extends BaseEntity {
  chat: Chat;
  sender: User;
  content: string;
  isRead: boolean;
}

export interface Chat extends BaseEntity {
  user1: User;
  user2: User;
  messages: Message[];
}

export interface Review extends BaseEntity {
  content: string;
  author: User;
  worker: Worker;
  parent?: Review;
  replies: Review[];
}
