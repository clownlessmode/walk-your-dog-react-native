import BaseEntity from "@shared/types/base-entity.interface";
import { Meta } from "./meta.interface";
import { Balance } from "@entity/balance/model/balance.interface";
import { Pet } from "@entity/pets/model/pet.interface";

export interface User extends BaseEntity {
    meta: Meta
    refreshToken: string;
    balance: Balance;
    pets: Pet[];
}
