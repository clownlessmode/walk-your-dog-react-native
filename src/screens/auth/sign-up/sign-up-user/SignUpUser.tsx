import ContactSupport from '@features/contact-support/ContactSupport';
import GoBack from '@features/go-back/GoBack';
import Form from '@features/sign-up-user/Form';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import { View } from 'react-native';

const SignUpUser = () => {
  return (
    <ScrollContainer
      header={
        <>
          <Header before={<GoBack />}>Давайте знакомиться!</Header>
          <Description>Расскажите о себе</Description>
        </>
      }
    >
        <Form />
      <ContactSupport />
    </ScrollContainer>
  );
};

export default SignUpUser;
