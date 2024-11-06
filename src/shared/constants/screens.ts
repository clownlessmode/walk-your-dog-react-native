import Authorization from '@screens/auth/authorization/Authorization';
import Identity from '@screens/auth/identity/Identity';
import SignUpPet from '@screens/auth/sign-up/sign-up-pet/SignUpPet';
import SignUpUser from '@screens/auth/sign-up/sign-up-user/SignUpUser';
import VerifySms from '@screens/auth/verify-sms/VerifySms';
import NotificationsQuestion from '@screens/notifications-question/NotificationsQuestion';
import Onboarding from '@screens/onboarding/Onboarding';
import { Screens } from '@shared/types/screens.type';
import AppStack from '@app/providers/navigation/AppStack';
import Telephone from '@screens/profile/update/telephone/Telephone';
import UpdateTelephone from '@screens/profile/update/telephone/UpdateTelephone';
import VerifySmsTelephone from '@screens/profile/update/telephone/VerifySmsTelephone';
import SuccessUpdate from '@shared/ui/success-update/SuccessUpdate';
import MyPets from '@screens/my-pets/MyPets';
import PetDetails from '@widgets/pet-details/PetDetails';
import Reminder from '@screens/reminder/Reminder';
import SelectPet from '@screens/reminder/select-pet/SelectPet';
import InfoEvent from '@screens/reminder/info-event/InfoEvent';
import Map from '@screens/map/Map';
import Abonements from '@screens/abonements/Abonements';
import Service from '@screens/service/Service';
import DetailsService from '@screens/details-service/DetailsService';
import BuyAbonements from '@screens/buy-abonements/BuyAbonements';
import MyAddresses from '@screens/my-addresses/MyAddresses';
import MyAddress from '@screens/my-addresses/my-address/MyAddress';

type ScreenConfig = {
  name: keyof Screens;
  component: React.ComponentType;
  options?: object;
};

export const AUTHSCREENS: ScreenConfig[] = [
  {
    name: 'onboarding',
    component: Onboarding,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'identity',
    component: Identity,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'authorization',
    component: Authorization,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'verifySms',
    component: VerifySms,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'signUpUser',
    component: SignUpUser,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'signUpPet',
    component: SignUpPet,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'notificationsQuestion',
    component: NotificationsQuestion,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'appStack',
    component: AppStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'updateTelephone',
    component: UpdateTelephone,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'telephone',
    component: Telephone,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'verifySmsTelephone',
    component: VerifySmsTelephone,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'successUpdate',
    component: SuccessUpdate,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'myPets',
    component: MyPets,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'petDetails',
    component: PetDetails,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'reminder',
    component: Reminder,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'selectPet',
    component: SelectPet,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'infoEvent',
    component: InfoEvent,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'map',
    component: Map,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'abonements',
    component: Abonements,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'service',
    component: Service,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'detailsService',
    component: DetailsService,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'buyAbonements',
    component: BuyAbonements,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'myAddresses',
    component: MyAddresses,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'myAddress',
    component: MyAddress,
    options: {
      headerShown: false,
    },
  },
];
