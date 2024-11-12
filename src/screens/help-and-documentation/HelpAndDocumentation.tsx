import { useUserController } from '@entity/users/user.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ConfirmDeleteModal from '@shared/ui/confirm-delete/ConfirmDelete';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

function HelpAndDocumentation() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useUserStore();
  const navigation = useAppNavigation();
  const { deleteUser } = useUserController();
  if (!user) return null;
  const handleDelete = async () => {
    const response = await deleteUser(user.id);
    console.log(response);
    if (response) {
      navigation.navigate('identity');
      setModalVisible(false);
      setUser(null);
    }
    setModalVisible(false);
  };

  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Помощь и документация</Header>
      <View style={{ gap: 28 }}>
        <View style={{ gap: 10 }}>
          <Text style={[globalStyles.text400, { fontSize: 16 }]}>
            По любым вопросам вы можете обращаться в наш чат заботы или по
            контактам ниже.
          </Text>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            +7 952 000 22 11
          </Text>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            Woof@walkyourdog.ru
          </Text>
          <View style={{ flexDirection: 'row', gap: 18 }}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://vk.com/walkyourdog_nn')}
            >
              <Image
                source={require('@assets/social/vk.png')}
                style={{ width: 29, height: 29 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://t.me/walkyourdogrussia')}
            >
              <Image
                source={require('@assets/social/tg.png')}
                style={{ width: 29.17, height: 29.17 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://instagram.com/walk_your_dog')
              }
            >
              <Image
                source={require('@assets/social/inst.png')}
                style={{ width: 29.17, height: 29.17 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('paymentsHistory')}
          >
            <Text style={[globalStyles.text500]}>
              История пополнения и списания
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[globalStyles.text500]}>Оценить приложение</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[globalStyles.text500]}>
              Политика конфиденциальности
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[globalStyles.text500]}>Договор оферты</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[globalStyles.text500]}>
              Пользовательское соглашение
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[globalStyles.text500]}>Удалить мои данные</Text>
          </TouchableOpacity>
          <ConfirmDeleteModal
            title={'Вы уверены, что хотите удалить свой аккаунт?'}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={handleDelete}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

export default HelpAndDocumentation;
