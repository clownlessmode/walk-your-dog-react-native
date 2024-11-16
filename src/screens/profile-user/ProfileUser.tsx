import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import useUserStore from '@entity/users/user.store';
import { AntDesign } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import InfoBlock from '@shared/ui/details-item/DetailsItem';
import sliceId from '@shared/utils/sliceId';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DetailsItem from '@shared/ui/details-item/DetailsItem';
import UserDetails from '@widgets/user-details/UserDetails';
import { User } from '@entity/users/model/user.interface';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import { useAbonementsController } from '@entity/abonements/abonements.controller';
import { useFocusEffect } from '@react-navigation/native';
import getMeOnFocus from '@shared/utils/getMeOnFocus';

function ProfileUser() {
  getMeOnFocus();
  const navigation = useAppNavigation()
  const { user } = useUserStore();
  const balanceTextColor = user?.balance.general === 0 ? '#4c131a' : 'black';
  const { allAbonements, postAbonements } = useAbonementsController();
  return (
    <ScrollContainer
      header={
        <>
          <Header>Профиль</Header>
          <Description>Ваш ID: {user?.id ? sliceId(user.id) : 'ID отсутствует'}</Description>
        </>
      }
    >
      <UserProfile
        name={user ? user?.meta.name : ''}
        description={user ? user?.meta.email : ''}
        image={user?.meta.image}
        additional={
          <TouchableOpacity onPress={() => navigation.navigate('paymentsHistory')} style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={[globalStyles.text500, {color: balanceTextColor, fontSize: 16 }]}>
              {user?.balance.general} ₽
            </Text>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              {user?.balance.promo} Б
            </Text>
          </TouchableOpacity>
        }
      />
      <UserDetails user={user as User} />
    </ScrollContainer>
  );
}

export default ProfileUser;
