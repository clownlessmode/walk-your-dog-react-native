import { User } from '@entity/users/model/user.interface';
import { Entypo } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Drawer from '../drawer/Drawer';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

interface Props {
  user?: User;
  date?: string;
  nameService?: string;
  reviewText?: string;
}
function ReviewBlock({ user, date, nameService, reviewText }: Props) {
    const navigation = useAppNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const handleNavWriteRev = () => {
        setModalVisible(false);
        // navigation.navigate('appStack');
      };
      const handleNavAppealRev = () => {
        setModalVisible(false);
        // navigation.navigate('appStack');
      };
  return (
    <View style={{ gap: 6 }}>
      <View style={styles.wrapper}>
        <View style={styles.blockUser}>
          <Image
            source={require('@assets/signUp/avatarUser.png')}
            style={styles.img}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={[globalStyles.text500]}>{'Попа пися'}</Text>
            <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
              {'8 сент 20:41'}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="dots-three-vertical" size={18} color="#CCCCCC" />
        </TouchableOpacity>
      </View>
      <Text style={[globalStyles.text500, { color: '#C1C1C1' }]}>
        {'Купание'}
      </Text>
      <View>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>Отзыв</Text>
        <Text style={[globalStyles.text400]}>{'Все круто было'}</Text>
      </View>
      <Drawer modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={{gap: 8, paddingBottom: 10}}>
        <TouchableOpacity onPress={handleNavWriteRev}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>Написать ответ под отзывом</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavAppealRev}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>Обжаловать отзыв</Text>
        </TouchableOpacity>
        </View>
      </Drawer>
    </View>
  );
}

export default ReviewBlock;
