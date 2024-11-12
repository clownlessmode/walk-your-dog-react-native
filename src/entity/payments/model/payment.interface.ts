import BaseEntity from '../../../shared/types/base-entity.interface';

export interface Payment extends BaseEntity {
  type: string;
  total: number;
}

export interface PaymentsDto {
  id: string;
}

export interface PaymentsRo extends BaseEntity {
  type: string;
  total: number;
}
