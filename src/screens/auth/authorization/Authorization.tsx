import ContactSupport from '@features/contact-support/ContactSupport';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Logotype from '@shared/ui/logotype/Logotype';
import { Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import Form from '@features/authorization/Form';


const Authorization = () => {
  return (
    <ScreenContainer style={{ justifyContent: 'space-around' }}>
      <Logotype />
      <View style={styles.form}>
        <Text
          style={[
            globalStyles.text500,
            { fontSize: 20, maxWidth: 260, textAlign: 'center' },
          ]}
        >
          Войдите или зарегистируйтесь
        </Text>
        <Form />
        <Text
          style={[
            globalStyles.text300,
            { fontSize: 12, textAlign: 'center', maxWidth: 320 },
          ]}
        >
          Нажимая на кнопку, вы даете свое согласие на{' '}
          <Text style={globalStyles.text500}>
            обработку персональных данных
          </Text>
          , соглашаетесь с{' '}
          <Text style={globalStyles.text500}>
            политикой конфиденциальности и пользовательским соглашением
          </Text>
        </Text>
      </View>
      <ContactSupport />
    </ScreenContainer>
  );
};

export default Authorization;
