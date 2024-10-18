import BaseEntity from "@shared/types/base-entity.interface";
import { Role } from "./role.enum";

export interface Meta extends BaseEntity {
    image: string;
    telephone: string;
    role: Role;
    name: string;
    city: string;
    address: string;
    email: string;
    promocode: string;
}