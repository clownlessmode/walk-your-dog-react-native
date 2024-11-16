import PetTypes from '@entity/pet-types/model/pet-types.interface';
import { Pet } from '@entity/pets/model/pet.interface';
import { User } from '@entity/users/model/user.interface';
import { Location } from '@screens/map/map.store';
import BaseEntity from '@shared/types/base-entity.interface';

export interface Service extends BaseEntity {
  name: string;
  price: number;
  additional?: AdditionalService;
}

export interface AdditionalService extends BaseEntity {
  main_id: string;
  name: string;
  price: number;
}

export interface ServiceRo {
    service: Service
}

export interface ServiceCreateDto {
  mainServiceId: string;
  customerId: string;
  petId: string;
  subServiceIds: string[];
  datetime: string;
  comment: string;
  addressId: string;
  balanceType: string;
}

export interface ServiceCreateRo extends BaseEntity {
  mainService: MainService;
  worker?: User | null;
  customer: User;
  pet: Pet;
  subServices: SubService[];
  price: number;
  isPayed: boolean;
  datetime: string;
  status: Status;
  comment?: string;
  address: Location;
  payment_link?: string | null;
}

export interface MainService {
  id: string;
  name: string;
  price: number;
}

export interface Worker {
  id: string;
  start: string;
  end: string;
  days: number[];
  petTypes: PetTypes[];
  services: MainService[];
}

export interface SubService {
  id: string;
  main_id: string;
  name: string;
  price: number;
}

export enum Status {
  DONE = 'Выполнен',
  IN_PROGRESS = 'В работе',
  CANCELLED = 'Отменён',
  TRANSFERRED = 'Перенесён',
  REPORT = 'Ожидание отчёта',
  SEARCH = 'Поиск исполнителя',
  WAITING_PAYMENT = 'Ожидается оплата',
}
