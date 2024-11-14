import { useReviewController } from '@entity/reviews/reviews.controller';
import { Review } from '@entity/users/model/user.interface';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import ReviewBlock from '@shared/ui/review-block/ReviewBlock';
import getReviewWord from '@shared/utils/getReviewWord';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function Reviews({ route }: any) {
  const { user } = useUserStore();
  const { workerReviews, isLoadingWorkerReviews } = useReviewController(
    user?.worker.id
  );

  if (isLoadingWorkerReviews) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#9D9D9D" />
      </View>
    );
  }
  const topLevelReviews = workerReviews;

  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Отзывы</Header>
      <Text
        style={[
          globalStyles.text500,
          {
            fontSize: 30,
            width: '100%',
            textAlign: 'center',
            paddingVertical: 16,
          },
        ]}
      >
        {workerReviews?.length != undefined
          ? getReviewWord(workerReviews?.length)
          : 'Нет отзывов'}
      </Text>
      <FlatList
        data={topLevelReviews} // Данные для FlatList (замените на реальные данные)
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewBlock review={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}

export default Reviews;
