import BaseEntity from "@shared/types/base-entity.interface";
import { Role } from "./role.enum";
import { Location } from "@screens/map/map.store";

export interface Meta extends BaseEntity {
    image: string;
    telephone: string;
    role: Role;
    name: string;
    city: string;
    addresses: Location[];
    email: string;
    promocode: string;
}