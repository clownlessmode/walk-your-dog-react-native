import { ServiceRo } from "@entity/service/model/service.interface";
import { User } from "@entity/users/model/user.interface";
import BaseEntity from "@shared/types/base-entity.interface";

export interface ReportsDto {
    images: string[];
    comment: string
}

export interface ReportRo extends BaseEntity {
    images: string[];
    comment: string;
    service: ServiceRo
    worker: User;
}