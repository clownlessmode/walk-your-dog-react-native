import { useSocket } from '@app/providers/SocketContext';
import { useChatsController } from '@entity/chats/chats.controller';
import { Chat as ChatType, Message } from '@entity/users/model/user.interface';
import useUserStore from '@entity/users/user.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import UserChat from '@shared/ui/user-chat/UserChat';
import getMeOnFocus from '@shared/utils/getMeOnFocus';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from 'react-native';
type ChatItem = {
  id: string;
  name: string;
  message: string;
  dayOfWeek: string;
  messages: { id: string; sender: 'me' | 'other'; text: string }[];
};

function Chat() {
  getMeOnFocus();
  const { user } = useUserStore();
  const { chats, isLoading } = useChatsController(user?.id);
  const [chatsState, setChatsState] = useState<ChatType[]>(chats ? chats : []);
  const { socket } = useSocket();
  const navigation = useAppNavigation();
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: Message) => {
      setChatsState((prevChats) =>
        prevChats.map((chat) =>
          chat.id === message.chat.id
            ? {
                ...chat,
                messages: [...chat.messages, message],
                updated_at: message.updated_at,
              }
            : chat
        )
      );
    };
    socket.on(`newMessage`, handleNewMessage);
    return () => {
      socket.off(`newMessage`, handleNewMessage);
    };
  }, []);

  const filteredChats = chatsState.filter((chat) => {
    const otherUser =
      chat.user1?.meta.name === 'support' ? chat.user2 : chat.user1;

    // Проверяем, что otherUser и его username существуют
    if (!otherUser || !otherUser.meta.name) return false;
    return otherUser.meta.name.toLowerCase();
  });
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMM', { locale: ru });
  };

  const renderChatItem: ListRenderItem<ChatType> = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('userChat', { id: item.id })}
    >
      <UserChat
        image={item.user2.meta.image}
        name={item.user2.meta.name}
        message={`${item.messages[item.messages.length - 1].sender.meta.name}: ${item.messages[item.messages.length - 1].content}`}
        dayOfWeek={`${formatDate(item.updated_at)}`}
      />
    </TouchableOpacity>
  );
// const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Нам нужно разрешение на доступ к вашей галерее');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImages([...selectedImages, result.assets[0].uri]);
  //   }
  // };
  return (
    <ScreenContainer>
      <Header>Чат</Header>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12 }}
        />
      )}
    </ScreenContainer>
  );
}

export default Chat;
