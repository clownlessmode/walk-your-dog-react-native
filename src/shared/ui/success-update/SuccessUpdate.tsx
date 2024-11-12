import React from 'react';
import ScreenContainer from '../containers/ScreenContainer';
import Header from '../header/Header';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

function SuccessUpdate() {
  const navigation = useAppNavigation();
  return (
    <ScreenContainer>
      <Header
        after={
          <AntDesign
            name="close"
            size={20}
            color="black"
            onPress={() => navigation.navigate('appStack')}
          />
        }
      >
        <></>
      </Header>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="shield" size={150} color="#F4F4F4" />
          <AntDesign
            name="checkcircle"
            size={60}
            color="#56C300"
            style={styles.checkIcon}
          />
        </View>

        <Text style={[globalStyles.text500, styles.succesText]}>
          Вы подтвердили новый телефон
        </Text>
      </View>
    </ScreenContainer>
  );
}

export default SuccessUpdate;
