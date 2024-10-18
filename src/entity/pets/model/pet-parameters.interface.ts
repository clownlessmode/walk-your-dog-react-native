import { Vaccines } from "@entity/vaccines/model/vaccines.interface";
import BaseEntity from "../../../shared/types/base-entity.interface";

export interface PetParameters extends BaseEntity { 
    gender: "MALE" | "FEMALE";
    sterilized: boolean;
    aggressive: boolean;
    pulls: boolean;
    health: string;
    additional: string;
    vaccines: Vaccines[];
 }