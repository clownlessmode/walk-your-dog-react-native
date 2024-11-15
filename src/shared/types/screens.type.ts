import { Pet } from '@entity/pets/model/pet.interface';
import { ServiceCreateRo } from '@entity/service/model/service.interface';

export type Screens = {
  onboarding: undefined;
  identity: undefined;
  authorization: undefined;
  verifySms: undefined;
  signUpUser: undefined;
  signUpPet: undefined;
  profile: undefined;
  notificationsQuestion: undefined;
  appStack: undefined;
  updateTelephone: undefined;
  telephone: undefined;
  verifySmsTelephone: undefined;
  successUpdate: undefined;
  myPets: undefined;
  petDetails: { pet: Pet };
  reminder: undefined;
  selectPet: undefined;
  infoEvent: undefined;
  map: undefined;
  abonements: undefined;
  service: undefined;
  buyAbonements: undefined;
  myAddresses: undefined;
  myAddress: {
    address: string;
    lat: number;
    lon: number;
    id: string;
    name: string;
    apartment: string;
    doorcode: string;
    entrance: string
  };
  findNumber: undefined;
  signUpSitter: undefined;
  userChat: { id: string, name: string, image: string };
  deposit: undefined;
  webViewPayment: { uri: string };
  payment: { variant: 'success' | 'error' };
  paymentsHistory: undefined;
  archive: undefined;
  bonusProgram: undefined;
  helpAndDocumentation: undefined;
  eventWaiting: { event: ServiceCreateRo };
  addEvent: undefined
  addWindowEvent: undefined
  reviews: {countReviews: string}
  eventDetails: { event: ServiceCreateRo };
  curentTasks: undefined;
  signUpPetAdd: { petId: string };
};

type formattedData = {
  mainServiceId: string | undefined;
  customerId: string | undefined;
  petId: any;
  addressId: any;
  datetime: any;
  subServiceIds: string[] | undefined;
};

type ChatMessage = {
  id: string;
  sender: 'me' | 'other';
  text: string;
};
