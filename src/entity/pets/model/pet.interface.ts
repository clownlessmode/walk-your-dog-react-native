import Breeds from "@entity/breeds/model/breeds.interface";
import BaseEntity from "../../../shared/types/base-entity.interface";
import { PetParameters } from "./pet-parameters.interface";

export interface Pet extends BaseEntity {
    image: string;
    name: string;
    breed?: Breeds | null;
    birthdate: Date;
    owner: string;
    parameters: PetParameters;
}