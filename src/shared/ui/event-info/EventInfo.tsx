import { ServiceCreateRo } from '@entity/service/model/service.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import formatMapText from '@shared/utils/formatMapText';
import normalizeData from '@shared/utils/normalizeDate';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import StatusText from '../status/Status';
import Executor from '../executor/Executor';
import useTime from '@shared/hooks/useTime';
import Button from '../button/Button';
import { useChatsController } from '@entity/chats/chats.controller';
import useUserStore from '@entity/users/user.store';
import { ChatsCreateDto } from '@entity/chats/model/chats.interface';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { baseApi } from '@shared/api/base.api';
import { useUserController } from '@entity/users/user.controller';
interface Props {
  status: string;
  address: string;
  service: string;
  pet: string;
  pettype: string;
  time: string;
  price: number;
  comment?: string;
  worker?: {
    id: string;
    img: string;
    name: string;
    created_at: string;
    reviews: number;
  };
  client?: {
    id: string;
    img: string;
    name: string;
    created_at: string;
  };
  additionalPet?: string;
  role?: 'CLIENT' | 'SITTER';
}

function EventInfo({
  status,
  address,
  service,
  pet,
  pettype,
  time,
  price,
  comment,
  worker,
  client,
  additionalPet,
  role = 'CLIENT',
}: Props) {
  const { user } = useUserStore();
  const navigation = useAppNavigation();
  const { chats, isLoading } = useChatsController(user?.id);
  const { createChat, isLoadingCreateChat } = useChatsController();
  const { userInfo } = useUserController();
  const handleCreateChat = async (targetUserId: string) => {
    if (!user?.id || !targetUserId) {
      console.error('Недостаточно данных для создания чата');
      return;
    }

    const existingChat = chats?.find(
      (chat) =>
        (chat.user1.id === user.id && chat.user2.id === targetUserId) ||
        (chat.user2.id === user.id && chat.user1.id === targetUserId)
    );

    if (existingChat) {
      navigation.navigate('userChat', {
        id: existingChat.id,
        name:
          existingChat.user1.id === user.id
            ? existingChat.user2.meta.name
            : existingChat.user1.meta.name,
        image:
          existingChat.user1.id === user.id
            ? existingChat.user2.meta.image
            : existingChat.user1.meta.image,
      });
      return;
    }

    const dto: ChatsCreateDto = {
      user1Id: user.id,
      user2Id: targetUserId,
    };

    try {
      const newChat = await createChat(dto);

      // Получаем данные пользователя через контроллер
      const otherUser =
        newChat.user1Id === user.id
          ? await userInfo(newChat.user2Id)
          : await userInfo(newChat.user1Id);

      navigation.navigate('userChat', {
        id: newChat.id,
        name: otherUser.meta.name,
        image: otherUser.meta.image,
      });
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
    }
  };

  const getRussianEnding = (number: number, words: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const mod =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)];
    return words[mod];
  };
  const reviewsText = (count: number) =>
    `${getRussianEnding(count, ['отзыв', 'отзыва', 'отзывов'])}`;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ gap: 14 }}>
        <View style={styles.wrapper}>
          <StatusText status={status} />
          <Text>{formatMapText(address)}</Text>
        </View>
        <View style={styles.horizontalLine} />
        {/*  */}
        <View style={styles.event}>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            {service}
          </Text>
          <View style={styles.horizontalLine} />
          <View style={styles.row}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>{pet}</Text>
            <Text style={{ fontSize: 18, opacity: 0.5 }}>|</Text>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              {pettype}
            </Text>
            <Text style={{ fontSize: 18, opacity: 0.5 }}>|</Text>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>{time}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            {price <= 0
              ? 'Оплачено абонементом'
              : `Стоимость заказа: ${price} ₽`}
          </Text>
        </View>
        {/*  */}

        {comment ? (
          <View style={{ gap: 2 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Комментарий:
            </Text>
            <Text style={[globalStyles.text400, { color: '#949494' }]}>
              {comment}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {role === 'SITTER' ? (
          <View style={{ gap: 2 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Особенности питомца:
            </Text>
            <Text style={[globalStyles.text400, { color: '#949494' }]}>
              {additionalPet}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{ gap: 10 }}>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>
            {role === 'SITTER' ? 'Клиент:' : 'Исполнитель:'}
          </Text>
          {(role === 'SITTER' && user) || (role === 'CLIENT' && worker) ? (
            <UserProfile
              name={
                (role === 'SITTER' ? client?.name : worker?.name) ||
                'Нет данных'
              }
              description={normalizeData(
                (role === 'SITTER' ? client?.created_at : worker?.created_at) ||
                  ''
              )}
              image={(role === 'SITTER' ? client?.img : worker?.img) || ''}
              additional={
                role === 'CLIENT' && worker ? (
                  <TouchableOpacity
                    style={{ flexDirection: 'column', alignItems: 'center' }}
                  >
                    <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                      {worker.reviews}
                    </Text>
                    <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                      {reviewsText(worker.reviews)}
                    </Text>
                  </TouchableOpacity>
                ) : undefined
              }
            />
          ) : (
            <Executor />
          )}
        </View>

        {role === 'SITTER' ? (
          <View style={{ gap: 12 }}>
            <Button
              onPress={() => handleCreateChat(client?.id || '')}
              isLoading={isLoadingCreateChat}
            >
              Связаться с владельцем
            </Button>
            <Button onPress={() => console.log('Завершить заказ')}>
              Завершить заказ
            </Button>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => console.log('Чат с подержкой')}
            >
              <Text style={[globalStyles.text500]}>Чат с подержкой</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <Button
              onPress={() => handleCreateChat(worker?.id || '')}
              isLoading={isLoadingCreateChat}
            >
              Связаться с исполнителем
            </Button>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => console.log('Чат с подержкой')}
            >
              <Text style={[globalStyles.text500]}>Чат с подержкой</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default EventInfo;
