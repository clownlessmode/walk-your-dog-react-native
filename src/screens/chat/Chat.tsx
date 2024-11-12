import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import UserChat from '@shared/ui/user-chat/UserChat';
import getMeOnFocus from '@shared/utils/getMeOnFocus';
import React from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
type ChatItem = {
  id: string;
  name: string;
  message: string;
  dayOfWeek: string;
  messages: { id: string; sender: 'me' | 'other'; text: string }[];
};
const mess: ChatItem[] = [
  {
    id: '1',
    name: 'Алексей',
    message: 'Как тебе новая книга?',
    dayOfWeek: 'Пн',
    messages: [
      { id: '1', sender: 'other', text: 'Привет, ты уже читал новую книгу Пелевина?' },
      { id: '2', sender: 'me', text: 'Да, как раз дочитываю. Очень впечатляет!' },
      { id: '3', sender: 'other', text: 'Согласен, там много интересных мыслей.' },
      { id: '4', sender: 'me', text: 'Особенно нравится его подход к современным технологиям.' },
      { id: '5', sender: 'other', text: 'Да, это точно. Очень актуально!' },
      { id: '6', sender: 'me', text: 'Тебе какой момент больше всего понравился?' },
      { id: '7', sender: 'other', text: 'Трудно выбрать, но глава о виртуальной реальности просто потрясающая.' },
      { id: '8', sender: 'me', text: 'Согласен! Очень интересно описано.' },
      { id: '9', sender: 'other', text: 'Интересно, что будет в его следующей книге.' },
    ],
  },
  {
    id: '2',
    name: 'Ольга',
    message: 'Ты был на концерте вчера?',
    dayOfWeek: 'Ср',
    messages: [
      { id: '1', sender: 'other', text: 'Привет! Ты был на концерте вчера?' },
      { id: '2', sender: 'me', text: 'Да, было просто невероятно!' },
      { id: '3', sender: 'other', text: 'Какая песня тебе больше всего понравилась?' },
      { id: '4', sender: 'me', text: 'Наверное, "Небо на ладони". Атмосфера была просто магическая.' },
      { id: '5', sender: 'other', text: 'Жаль, что я не смогла пойти. Надеюсь, они приедут снова.' },
      { id: '6', sender: 'me', text: 'Обязательно сходи в следующий раз! Ты не пожалеешь.' },
    ],
  },
  {
    id: '3',
    name: 'Игорь',
    message: 'Где будем встречаться?',
    dayOfWeek: 'Вт',
    messages: [
      { id: '1', sender: 'other', text: 'Привет! Где будем встречаться в субботу?' },
      { id: '2', sender: 'me', text: 'Может, в том кафе на Пушкинской? Там уютно и не так людно.' },
      { id: '3', sender: 'other', text: 'Хорошая идея! Там действительно отличный кофе.' },
      { id: '4', sender: 'me', text: 'Отлично, тогда в 7 вечера. Подходит?' },
      { id: '5', sender: 'other', text: 'Да, супер. До встречи!' },
    ],
  },
];


function Chat() {
  getMeOnFocus()
  const navigation = useAppNavigation();
  const handleChatPress = (chat: ChatItem) => {
    navigation.navigate('userChat', { chat });
  };
  const renderChatItem: ListRenderItem<ChatItem> = ({ item }) => (
    <TouchableOpacity onPress={() => handleChatPress(item)}>
      <UserChat
        name={item.name}
        message={item.message}
        dayOfWeek={item.dayOfWeek}
      />
    </TouchableOpacity>
  );
  return (
    <ScreenContainer>
      <Header>Чат</Header>
      <FlatList
        data={mess}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
      />
    </ScreenContainer>
  );
}

export default Chat;
