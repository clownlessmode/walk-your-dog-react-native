import { Linking, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import CONFIG from '@shared/constants/config';

const ContactSupport = () => {
  const handlePress = () => {
    Linking.openURL(CONFIG.support)
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={[globalStyles.text400, { fontSize: 14 }]}>
          Связаться с поддержкой
        </Text>
      </TouchableOpacity>
      <Text style={[globalStyles.text400, { fontSize: 12 }]}>
        Версия приложения {CONFIG.appVersion}
      </Text>
    </View>
  );
};

export default ContactSupport;
