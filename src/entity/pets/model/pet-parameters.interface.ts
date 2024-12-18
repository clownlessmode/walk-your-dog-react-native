import { Vaccines } from '@entity/vaccines/model/vaccines.interface';
import BaseEntity from '../../../shared/types/base-entity.interface';

export interface PetParameters extends BaseEntity {
  gender: 'MALE' | 'FEMALE';
  sterilized: boolean;
  aggressive: boolean;
  pulls: boolean;
  health: string;
  additional: string;
  vaccines: Vaccines[];
  homeName?: string;
  colorPet?: string;
  weight?: string;
  mark?: string;
  placeMark?: string;
  lastDayVaccine?: string;
  demorwAndPreparation?: string;
  operationsAndComplications?: string;
  diseasesAndBoters?: string;
  untied?: boolean;
  lastDayPuppy?: Date;
  specialSigns?: string;
  diet?: string[];
  favoriteTreats?: string;
  separationExperience?: boolean;
  behaviorAlone?: string;
  characterTraits?: string;
  whatLoves?: string;
  whatDoesntLove?: string;
  training?: string;
  knowledgeTraining?: string;
  attitudePeople?: string;
  attitudeDogs?: string;
  knowLeash?: boolean;
  knowMuzzle?: boolean;
  refusalMuzzle?: string;
  badHabits?: string;
  numberWalks?: string;
  walkingTime?: string;
  walkingFeatures?: string;
  specialRequests?: string;
  addressDog?: string;
  preferredMessenger?: string;
  returnOwner?: boolean;
  trustedPerson?: string;
  howFindUs?: string;
}

export interface PetParametersDto {
  homeName?: string;
  colorPet?: string;
  weight?: string;
  mark?: string;
  placeMark?: string;
  lastDayVaccine?: string;
  demorwAndPreparation?: string;
  operationsAndComplications?: string;
  diseasesAndBoters?: string;
  untied?: boolean;
  lastDayPuppy?: Date;
  specialSigns?: string;
  diet?: string[];
  favoriteTreats?: string;
  separationExperience?: boolean;
  behaviorAlone?: string;
  characterTraits?: string;
  whatLoves?: string;
  whatDoesntLove?: string;
  training?: string;
  knowledgeTraining?: string;
  attitudePeople?: string;
  attitudeDogs?: string;
  knowLeash?: boolean;
  knowMuzzle?: boolean;
  refusalMuzzle?: string;
  badHabits?: string;
  numberWalks?: string;
  walkingTime?: string;
  walkingFeatures?: string;
  specialRequests?: string;
  addressDog?: string;
  preferredMessenger?: string;
  returnOwner?: boolean;
  trustedPerson?: string;
  howFindUs?: string;
}
