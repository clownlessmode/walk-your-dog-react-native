import { Pet } from "@entity/pets/model/pet.interface";

export type Screens = {
    onboarding: undefined;
    identity: undefined;
    authorization: undefined;
    verifySms: undefined;
    signUpUser: undefined;
    signUpPet: undefined;
    profile: undefined;
    notificationsQuestion: undefined;
    appStack: undefined
    updateTelephone: undefined;
    telephone: undefined;
    verifySmsTelephone: undefined;
    successUpdate: undefined;
    myPets: undefined;
    petDetails: {pet: Pet};
    reminder: undefined;
    selectPet: undefined;
    infoEvent: undefined;
    map: undefined;
    abonements: undefined;
    service: undefined;
    detailsService: undefined;
    buyAbonements: undefined;
    myAddresses: undefined;
    myAddress: {address: string, lat: number, lon: number};
} 