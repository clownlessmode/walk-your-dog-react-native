import { Pet } from "./pet.interface";

export interface CreatePetDto {
    image: any;
    owner: string;
    name: string;
    breed: string;
    birthdate: Date;
    gender: string;
    sterilized: boolean;
    aggressive: boolean,
    pulls: boolean,
    health: string;
    additional: string;
    vaccines: [];
}

export interface CreatePetRo {
    pet: Pet
}