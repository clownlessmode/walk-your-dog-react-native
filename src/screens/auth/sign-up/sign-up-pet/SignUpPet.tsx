import useUserStore from '@entity/users/user.store';
import { MaterialIcons } from '@expo/vector-icons';
import ContactSupport from '@features/contact-support/ContactSupport';
import GoBack from '@features/go-back/GoBack';
import Form from '@features/sign-up-pet/Form';
import FetchExample from '@features/sign-up-pet/Test';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import { StyleSheet, TouchableOpacity } from 'react-native';

function SignUpPet() {
  const { user } = useUserStore();
  const navigation = useAppNavigation();
const handleGoBack = () => {
  navigation.navigate('myPets')
}
  return (
    <ScrollContainer
      header={
        <>
          <Header
            before={
              user && user?.pets.length < 1 ? (
                <></>
              ) : (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleGoBack}
                >
                  <MaterialIcons
                    name="keyboard-backspace"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              )
            }
          >
            Давайте знакомиться!
          </Header>
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
const styles = StyleSheet.create({
  backButton: {
    position: "absolute", 
    left: 0,
  },
})
export default SignUpPet;
