import ContactSupport from '@features/contact-support/ContactSupport';
import Form from '@features/sign-up-pet/Form';
import FetchExample from '@features/sign-up-pet/Test';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';

function SignUpPet() {
  return (
    <ScrollContainer
      header={
        <>
          <Header>Давайте знакомиться!</Header>
          <Description>Расскажите о питомце</Description>
        </>
      }
    >
      <Form />
      {/* <FetchExample /> */}
      <ContactSupport />
    </ScrollContainer>
  );
}

export default SignUpPet;
