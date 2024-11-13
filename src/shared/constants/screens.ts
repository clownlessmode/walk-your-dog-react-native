import Authorization from '@screens/auth/authorization/Authorization';
import Identity from '@screens/auth/identity/Identity';
import SignUpPet from '@screens/auth/sign-up/sign-up-pet/SignUpPet';
import SignUpUser from '@screens/auth/sign-up/sign-up-user/SignUpUser';
import VerifySms from '@screens/auth/verify-sms/VerifySms';
import NotificationsQuestion from '@screens/notifications-question/NotificationsQuestion';
import Onboarding from '@screens/onboarding/Onboarding';
import { Screens } from '@shared/types/screens.type';
import AppStack from '@app/providers/navigation/AppStack';
import Telephone from '@screens/profile-user/update/telephone/Telephone';
import UpdateTelephone from '@screens/profile-user/update/telephone/UpdateTelephone';
import VerifySmsTelephone from '@screens/profile-user/update/telephone/VerifySmsTelephone';
import SuccessUpdate from '@shared/ui/success-update/SuccessUpdate';
import MyPets from '@screens/my-pets/MyPets';
import PetDetails from '@widgets/pet-details/PetDetails';
import Reminder from '@screens/reminder/Reminder';
import SelectPet from '@screens/reminder/select-pet/SelectPet';
import InfoEvent from '@screens/reminder/info-event/InfoEvent';
import Map from '@screens/map/Map';
import Abonements from '@screens/abonements/Abonements';
import Service from '@screens/service/Service';
import BuyAbonements from '@screens/buy-abonements/BuyAbonements';
import MyAddresses from '@screens/my-addresses/MyAddresses';
import MyAddress from '@screens/my-addresses/my-address/MyAddress';
import SignUpSitter from '@screens/sign-up-sitter/SignUpSitter';
import FindNumber from '@screens/find-number/FindNumber';
import UserChat from '@screens/chat/user-chat/UserChat';
import Deposit from '@screens/deposit/Deposit';
import WebViewPayment from '@screens/web-view-payment/WebViewPayment';
import Payment from '@shared/ui/payment/Payment';
import PaymentsHistory from '@screens/payments-history/PaymentsHistory';
import Archive from '@screens/archive/Archive';
import BonusProgram from '@screens/bonus-program/BonusProgram';
import HelpAndDocumentation from '@screens/help-and-documentation/HelpAndDocumentation';
import EventWaiting from '@screens/event-waiting/EventWaiting';
import AddWindowEvent from '@screens/AddWindowEvent/AddWindowEvent';
import AddEvent from '@screens/add-event/AddEvent';
import Reviews from '@screens/reviews/Reviews';
import EventDetails from '@screens/event-details/EventDetails';

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
  {
    name: 'findNumber',
    component: FindNumber,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'signUpSitter',
    component: SignUpSitter,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'userChat',
    component: UserChat,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'deposit',
    component: Deposit,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'webViewPayment',
    component: WebViewPayment,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'payment',
    component: Payment,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'paymentsHistory',
    component: PaymentsHistory,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'archive',
    component: Archive,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'bonusProgram',
    component: BonusProgram,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'helpAndDocumentation',
    component: HelpAndDocumentation,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'eventWaiting',
    component: EventWaiting,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'addEvent',
    component: AddEvent,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'addWindowEvent',
    component: AddWindowEvent,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'reviews',
    component: Reviews,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'eventDetails',
    component: EventDetails,
    options: {
      headerShown: false,
    },
  },
];
