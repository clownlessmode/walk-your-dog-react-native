import BaseEntity from "@shared/types/base-entity.interface";
import { Meta } from "./meta.interface";
import { Balance } from "@entity/balance/model/balance.interface";
import { Pet } from "@entity/pets/model/pet.interface";
import { AbonementBuyRo } from "@entity/abonements/modal/abonements.interface";

export interface User extends BaseEntity {
    meta: Meta
    abonements: AbonementBuyRo[];
    refreshToken: string;
    balance: Balance;
    pets: Pet[];
}
