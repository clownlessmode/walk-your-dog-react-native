import BaseEntity from "../../../shared/types/base-entity.interface";

export interface Payment extends BaseEntity {
    type: string;
    total: number;
    balanceId: string;
}