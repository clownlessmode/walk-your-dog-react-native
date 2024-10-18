import BaseEntity from "../../../shared/types/base-entity.interface";
import { Payment } from "../../payments/model/payment.interface";

export interface Balance extends BaseEntity{
    promo: number;
    general: number;
    payments: Payment[]
}