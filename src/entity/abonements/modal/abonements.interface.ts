import { User } from "@entity/users/model/user.interface";
import BaseEntity from "@shared/types/base-entity.interface";

export interface AbonementDto {
    id: string;
}

export interface AbonementRo extends BaseEntity {
    expiresAt: string;
    abonementType: string;
    total: number;
}

export interface AbonementBuyDto{
    userId: string;
    abonementId: string;
    balanceType: string;
  }

export interface AbonementBuyRo extends BaseEntity {
    remaining: number;
    expiresAt: string;
    user: User;
    abonement: Abonement;
}

interface Abonement extends BaseEntity {
    id: string;
    abonementType: string;
    total: number;
    price: number;
}