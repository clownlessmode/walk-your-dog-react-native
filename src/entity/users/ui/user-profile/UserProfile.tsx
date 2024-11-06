import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '@shared/constants/globalStyles';
import styles from './styles';
interface Props {
  name: string;
  description: string;
  link?: () => void;
  image?: string;
  additional?: React.ReactNode;
}
const UserProfile = ({ name, description, link, image, additional }: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={link}>
      <View style={styles.content}>
        <Image
          source={
            image ? { uri: image } : require('@assets/signUp/EmptyAvatar.png')
          }
          style={styles.img}
        />
        <View style={styles.name}>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>{name}</Text>
          <Text style={globalStyles.text400}>{description}</Text>
        </View>
      </View>
      {additional}
    </TouchableOpacity>
  );
};

export default UserProfile;
