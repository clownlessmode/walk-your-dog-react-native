import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Review, User } from '@entity/users/model/user.interface';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import styles from './styles';
import Drawer from '../drawer/Drawer';
import Button from '../button/Button';
import { useReviewController } from '@entity/reviews/reviews.controller';
import useUserStore from '@entity/users/user.store';
import Input from '../input/Input';

interface Props {
  review: Review;
  level?: number;
  drawer?: boolean;
}

function buildReviewHierarchy(reviews: Review[]): Review[] {
  const reviewMap: { [key: string]: Review } = {}; // Мапа для быстрого доступа к отзывам

  // Инициализация мапы отзывов
  reviews.forEach((review) => {
    reviewMap[review.id] = { ...review, replies: [] }; // Обязательно создаем пустой массив replies
  });

  const topLevelReviews: Review[] = [];

  // Формирование иерархии
  reviews.forEach((review) => {
    if (review.parent) {
      // Если есть родительский отзыв, добавляем текущий отзыв в массив replies родителя
      reviewMap[review.parent.id].replies.push(reviewMap[review.id]);
    } else {
      // Если родителя нет, это верхнеуровневый отзыв
      topLevelReviews.push(reviewMap[review.id]);
    }
  });

  return topLevelReviews;
}

function ReviewBlock({ review, level = 0, drawer = false }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [replyContent, setReplyContent] = useState(''); // Состояние для ввода ответа

  const {
    createReview,
    isCreatingReview,
    isErrorCreatingReview,
    errorCreatingReview,
  } = useReviewController();
  const { user } = useUserStore();
  async function createNewReply() {
    try {
      const response = await createReview({
        author: user?.id as string,
        content: replyContent, // Используем текст из инпута
        workerId: user?.worker.id as string,
        parentId: review.id,
      });

      if (response) {
        console.log('Ответ успешно добавлен:', response);
        setReplyContent(''); // Очищаем поле ввода после успешного создания
        setModalVisible(false); // Закрываем модальное окно
      }
    } catch (error) {
      console.error(
        'Ошибка при создании ответа:',
        errorCreatingReview || error
      );
    }
  }

  return (
    <View style={{ marginLeft: level * 8, marginBottom: 10 }}>
      <View style={styles.wrapper}>
        <View style={styles.blockUser}>
          <Image
            source={
              review.author?.meta?.image
                ? { uri: review.author.meta.image }
                : require('@assets/signUp/avatarUser.png')
            }
            style={styles.img}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={[globalStyles.text500]}>
              {review.author?.meta?.name || 'Пользователь'}
            </Text>
            <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
              {new Date(review.created_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        {!drawer && (
          <View
            style={
              level === 0
                ? { position: 'absolute', right: 10, top: 10 }
                : { marginLeft: `${50 / level}%` } // Указываем строкой с процентом
            }
          >
            {level < 1 && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Entypo name="dots-three-vertical" size={18} color="#CCCCCC" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>Отзыв</Text>
        <Text style={[globalStyles.text400]}>{review.content}</Text>
      </View>
      <Drawer modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={{ gap: 8, paddingBottom: 10 }}>
          <ReviewBlock
            review={{ ...review, replies: [] }}
            level={level + 1}
            drawer={true}
          />
          {replyContent.length > 0 && (
            <View style={{ flexDirection: 'row', gap: 0 }}>
              <FontAwesome6
                name="arrow-turn-up"
                size={20}
                color="#51582F"
                style={{ transform: [{ scaleX: -1 }] }}
              />
              <ReviewBlock
                review={{
                  content: replyContent,
                  author: user as User,
                  worker: review.worker,
                  replies: [],
                  created_at: new Date().toISOString(), // Используем текущую дату
                  updated_at: new Date().toISOString(), // Используем текущую дату

                  id: '',
                }}
                level={2 + 1}
                drawer={true}
              />
            </View>
          )}
          <Input
            placeholder="Введите ваш ответ"
            value={replyContent}
            onChangeText={setReplyContent}
            style={{
              height: 40,
              borderColor: '#CCCCCC',
              borderWidth: 1,
              borderRadius: 5,
              padding: 8,
            }}
          />
          <Button isLoading={isCreatingReview} onPress={() => createNewReply()}>
            Написать ответ
          </Button>
        </View>
      </Drawer>
      {review.replies && review.replies.length > 0 && (
        <View style={{ marginTop: 10 }}>
          {review.replies.map((reply) => (
            <View style={{ flexDirection: 'row', gap: 0 }} key={reply.id}>
              <FontAwesome6
                name="arrow-turn-up"
                size={20}
                color="#51582F"
                style={{ transform: [{ scaleX: -1 }] }}
              />
              <ReviewBlock review={reply} level={level + 1} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default ReviewBlock;
