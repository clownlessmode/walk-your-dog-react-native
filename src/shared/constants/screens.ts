import Authorization from '@screens/auth/authorization/Authorization';
import Identity from '@screens/auth/identity/Identity';
import SignUpPet from '@screens/auth/sign-up/sign-up-pet/SignUpPet';
import SignUpUser from '@screens/auth/sign-up/sign-up-user/SignUpUser';
import VerifySms from '@screens/auth/verify-sms/VerifySms';
import NotificationsQuestion from '@screens/notifications-question/NotificationsQuestion';
import Onboarding from '@screens/onboarding/Onboarding';
import Profile from '@screens/profile/Profile';
import { Screens } from '@shared/types/screens.type';

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
];

export const APPSCREENS:ScreenConfig[] = [
  {
    name: 'profile',
    component: Profile,
    options: {
      headerShown: false,
    },
  },
];
