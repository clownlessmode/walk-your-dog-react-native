import BaseEntity from "@shared/types/base-entity.interface";


export interface AdressesDto {
    address: string;
    lat: number;
    lon: number;
    userId: string | undefined;
}

export interface AdressesRo extends BaseEntity {
    address: string;
    lat: number;
    lon: number;
    name: string;
    apartment: string;
    doorcode: string;
    entrance: string
}

export interface UpdateAddressDto {
    address?: string;
    name?: string;
    lat?: number;
    lon?: number;
    apartment?: string;
    doorcode?: string;
    entrance?: string;
  
}