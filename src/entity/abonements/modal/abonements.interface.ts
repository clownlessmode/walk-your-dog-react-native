import { User } from "@entity/users/model/user.interface";
import BaseEntity from "@shared/types/base-entity.interface";

export interface AbonementDto {
    id: string;
}

export interface AbonementRo extends BaseEntity {
    abonementType: AbonementType;
    total: number;
    price: number;
}

export interface AbonementType extends BaseEntity {
    name: string;
    price: string;
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
    total: number;
    price: string;
    abonementType: AbonementType
}