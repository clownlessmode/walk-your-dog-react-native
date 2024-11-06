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
import { ScrollView, Text, View } from 'react-native';
import DetailsItem from '@shared/ui/details-item/DetailsItem';
import UserDetails from '@widgets/user-details/UserDetails';
import { User } from '@entity/users/model/user.interface';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';

function Profile() {
  const { user } = useUserStore();
  return (
    <ScrollContainer
      header={
        <>
          <Header>Профиль</Header>
          <Description>Ваш ID: {sliceId(user?.id as string)}</Description>
        </>
      }
    >
        <UserProfile
          name={user ? user?.meta.name : ''}
          description={user ? user?.meta.email : ''}
          image={user?.meta.image}
          additional={
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                {user?.balance.general} ₽
              </Text>
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                {user?.balance.promo} Б
              </Text>
            </View>
          }
        />
        <UserDetails user={user as User} />
    </ScrollContainer>
  );
}

export default Profile;
