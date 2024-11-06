import BaseEntity from "@shared/types/base-entity.interface";

export interface Reminders extends BaseEntity {
    user: string;
    datetime: string;
    reminderType: string;
    pet: string[];
    remind: number;
    repeatDays: number[];
}

export interface ReminderDto {
    user: string;
    datetime: string;
    reminderType: string;
    pet: string[];
    remind: number;
    repeatDays: number[];
}

export interface ReminderRo extends BaseEntity {
    reminderType: string;
    datetime: string;
    remind: number;
    repeatDays: number[];
    pets: ReminderPet[]
}

interface ReminderPet extends BaseEntity {
    name: string;
    birthdate: string;
    image: string;
}