import BaseEntity from "@shared/types/base-entity.interface";
import { User } from "@entity/users/model/user.interface";
export interface petServiceDto {
    id: string;
}

export interface petServiceRo extends BaseEntity {
    user: User
}