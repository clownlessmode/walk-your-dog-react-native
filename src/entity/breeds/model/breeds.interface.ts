import PetTypes from "@entity/pet-types/model/pet-types.interface";
import BaseEntity from "../../../shared/types/base-entity.interface";

export default interface Breeds extends BaseEntity {
    name: string;
    petType: PetTypes;
}