import { User } from '@entity/users/model/user.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import useUserStore from '@entity/users/user.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import BlockInfoUser from '@shared/ui/block-info-user/BlockInfoUser';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import ReviewBlock from '@shared/ui/review-block/ReviewBlock';
import sliceId from '@shared/utils/sliceId';
import WorkerDetails from '@widgets/worker-details/WorkerDetails';
import React from 'react';
import { Text, View } from 'react-native';

function ProfileWorker() {
  const navigation = useAppNavigation()
  const { user } = useUserStore();
  const balanceTextColor = user?.balance.general === 0 ? '#4c131a' : 'black';

  const handleNavReviews = () => {
    // const countReviews = user?.reviewsCount || 'Нет отзывов';
    // navigation.navigate('reviews', {countReviews})
  }
  return (
    <ScrollContainer
      header={
        <>
          <Header>Профиль</Header>
          <Description>Ваш ID: {sliceId(user?.id as string)}</Description>
        </>
      }
    >
      <View style={{gap: 16}}>
        <ReviewBlock />
        <UserProfile
          name={user ? user?.meta.name : ''}
          description={user ? user?.meta.email : ''}
          image={user?.meta.image}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <BlockInfoUser
          onPress={handleNavReviews}
            title={user?.meta.city ? user?.meta.city : ''}
            description={'Оставили ваши клиенты'}
            buttonDescription={'Как влиять на рейтинг?'}
            variant='dark'
          />
          <BlockInfoUser
            title={user?.meta.city ? user?.meta.city : ''}
            description={'Оставили ваши клиенты'}
            buttonDescription={'Как вывести деньги?'}
          />
        </View>
        <WorkerDetails user={user as User}/>
      </View>
    </ScrollContainer>
  );
}

export default ProfileWorker;
