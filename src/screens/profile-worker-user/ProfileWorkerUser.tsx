import { useReviewController } from '@entity/reviews/reviews.controller'
import GoBack from '@features/go-back/GoBack'
import { useRoute } from '@react-navigation/native'
import { useAppNavigation } from '@shared/hooks/useAppNavigation'
import BlockInfoUser from '@shared/ui/block-info-user/BlockInfoUser'
import ScreenContainer from '@shared/ui/containers/ScreenContainer'
import Description from '@shared/ui/description/Description'
import Header from '@shared/ui/header/Header'
import getReviewWord from '@shared/utils/getReviewWord'
import sliceId from '@shared/utils/sliceId'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

function ProfileWorkerUser() {
    const route = useRoute();
  const { workerId } = route.params as { workerId: string };
  const { workerReviews, isLoadingWorkerReviews } = useReviewController(workerId);
    const navigation = useAppNavigation();
    const handleNavReviews = () => {
        navigation.navigate('reviews', { 
          workerId, // Передаем workerId для страницы отзывов
          countReviews: workerReviews?.length || 0, // Передаем количество отзывов
        });
      };
     
  return (
    <ScreenContainer>
        <Header before={<GoBack />}>Профиль</Header>
        <Description>ID специалиста: {sliceId(workerId)}</Description>
         <BlockInfoUser
            onPress={handleNavReviews}
            title={
              isLoadingWorkerReviews ? (
                <ActivityIndicator size="small" color="#000" />
              ) : workerReviews?.length ? (
                getReviewWord(workerReviews?.length)
              ) : (
                'Нет отзывов'
              )
            }
            description={'Оставили ваши клиенты'}
            buttonDescription={'Как влиять на рейтинг?'}
            variant="dark"
          />
           <BlockInfoUser
            title={'Услуги'}
            description={'Какие услуги оказывает специалист'}
            buttonDescription={'Просмотреть'}
          />
    </ScreenContainer>
  )
}

export default ProfileWorkerUser