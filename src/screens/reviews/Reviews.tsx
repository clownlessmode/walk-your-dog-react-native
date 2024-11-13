import GoBack from '@features/go-back/GoBack'
import globalStyles from '@shared/constants/globalStyles'
import ScreenContainer from '@shared/ui/containers/ScreenContainer'
import Header from '@shared/ui/header/Header'
import ReviewBlock from '@shared/ui/review-block/ReviewBlock'
import React from 'react'
import { FlatList, Text } from 'react-native'
const mockReviews = [
    { id: '1', user: { name: 'Иван' }, date: '8 сент 20:41', nameService: 'Купание', reviewText: 'Все круто было' },
    { id: '2', user: { name: 'Мария' }, date: '7 сент 14:20', nameService: 'Стрижка', reviewText: 'Все прошло отлично!' },
  ];
function Reviews({route}: any) {
    const {countReviews} = route.params
  return (
    <ScreenContainer>
        <Header before={<GoBack />}>Отзывы</Header>
        <Text style={[globalStyles.text500, {fontSize: 30}]}>{getReviewWord(countReviews)}</Text>
        {/* <FlatList
        data={mockReviews} // Данные для FlatList (замените на реальные данные)
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewBlock
            user={item.user}
            date={item.date}
            nameService={item.nameService}
            reviewText={item.reviewText}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }} 
      />*/}
    </ScreenContainer>
  )
}

export default Reviews