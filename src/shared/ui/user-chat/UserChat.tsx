import useRoleStore from '@screens/auth/role.store';
import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';
interface Props {
  image: string;
    name: string;
    message: string;
    dayOfWeek: string;
}
function UserChat({ name, message, dayOfWeek, image }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        source={image ? { uri: image } : require('@assets/signUp/avatarUser.png')}
        style={{ width: 50, height: 50, borderRadius: 9999 }}
      />
      <View style={{ width: '100%' }}>
        <View style={styles.nameDate}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>{`${name}`}</Text>
          <Text style={[globalStyles.text500, {opacity: 0.5}]}>{dayOfWeek}</Text>
        </View>
        <Text style={[globalStyles.text400, {opacity: 0.5, maxWidth: '80%'}]}>{message}</Text>
      </View>
    </View>
  );
}

export default UserChat;
