import { useReviewController } from '@entity/reviews/reviews.controller';
import { Review } from '@entity/users/model/user.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import InputMessage from '@shared/ui/input-message/InputMessage';
import ReviewBlock from '@shared/ui/review-block/ReviewBlock';
import getReviewWord from '@shared/utils/getReviewWord';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function Reviews({ route }: any) {
  const {user} = useUserStore()
  console.log("ID USER", user?.id)
  const { workerId, countReviews } = route.params || {};
  const idReview = user?.meta.role === 'SITTER' ? user?.worker.id  : workerId
  console.log("ID WOKER", workerId)
  const { workerReviews, isLoadingWorkerReviews, createReview, isCreatingReview } = useReviewController(idReview);
  console.log(workerReviews)
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      console.error('Пустое сообщение, отправка отменена');
      return;
    }
  
    if (!workerId) {
      console.error('workerId отсутствует');
      return;
    }
  
    const payload = {
      author: user?.id as string, // ID автора отзыва
      content: newMessage, // Текст отзыва
      workerId: workerId // ID работника
    };
  
    console.log('Отправляемые данные:', payload);
  
    try {
      await createReview(payload);
      setNewMessage(''); // Очищаем поле после успешной отправки
    } catch (error) {
      console.error('Ошибка при создании отзыва:', error);
    }
  };
  

  if (!workerId && countReviews === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>
          Нет данных для отображения
        </Text>
      </View>
    );
  }
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
        data={topLevelReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewBlock review={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {user?.meta.role === 'CLIENT' && (
        <InputMessage
          value={newMessage}
          onChangeText={setNewMessage}
          onSend={handleSendMessage}
          // isLoading={isCreatingReview} // Передаем состояние загрузки
        />
      )}
    </ScreenContainer>
  );
}

export default Reviews;
