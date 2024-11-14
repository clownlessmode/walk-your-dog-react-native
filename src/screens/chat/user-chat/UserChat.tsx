import GoBack from '@features/go-back/GoBack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screens } from '@shared/types/screens.type';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import InputMessage from '@shared/ui/input-message/InputMessage';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useChatsController } from '@entity/chats/chats.controller';
import { Chat, Message } from '@entity/users/model/user.interface';
import { useSocket } from '@app/providers/SocketContext';
import useUserStore from '@entity/users/user.store';
type UserChatRouteProp = RouteProp<Screens, 'userChat'>;
function UserChat() {
  const { user } = useUserStore();
  const route = useRoute<UserChatRouteProp>();
  const { socket } = useSocket();
  const { id } = route.params;
  if (!id) return null;

  const { messages:chat, isLoadingMessages:isLoadingChat} = useChatsController(id);
  const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
    if (chat) {
      setMessages(chat);
      scrollToBottom();
    }
  }, [chat]);
  
  const [newMessage, setNewMessage] = useState('');



  const flatListRef = useRef<FlatList>(null);

const scrollToBottom = () => {
  flatListRef.current?.scrollToEnd({ animated: true });
};



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket || !id) return;
    socket.emit('joinChat', { chatId: id });
    const handleNewMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    };
    socket.on(`newMessage_${id}`, handleNewMessage);
    return () => {
      socket.off(`newMessage_${id}`, handleNewMessage);
    };
  }, [socket, id]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !id || !user) return;

    const tempMessage: Message = {
      id: Date.now().toString(),
      sender: user,
      content: newMessage.trim(),
      isRead: false,
      chat: { id } as Chat,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    scrollToBottom();
    socket.emit('sendMessage', { chatId: id, content: tempMessage.content });
    // setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setNewMessage('');
  };
  if (isLoadingChat) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="small" color="#9D9D9D" />
    </View>
  );
}

if (messages.length === 0) {
  return (
    <View style={styles.messageContainer}>
      <Text>No messages to display</Text>
    </View>
  );
}

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender.id === user?.id
          ? styles.myMessageRow
          : styles.otherMessageRow,
      ]}
    >
      {item.sender.id !== user?.id && (
        <Image
           source={
                item.sender?.meta?.image
                  ? { uri:  item.sender?.meta?.image }
                  : require('@assets/signUp/avatarUser.png')
              }
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.messageContainer,
          item.sender.id === user?.id ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            globalStyles.text500,
            item.sender.id === user?.id
              ? styles.myMesText
              : styles.otherMesText,
          ]}
        >
          {item.content}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScreenContainer>
        <Header before={<GoBack />}>
          <View style={styles.headerContent}>
            <Image
              source={
                messages[0].sender?.meta?.image
                  ? { uri: messages[0].sender?.meta?.image }
                  : require('@assets/signUp/avatarUser.png')
              }
              style={styles.avatar}
            />
            <Text style={[globalStyles.text500, styles.textHeader]}>
              {messages[0].sender?.meta?.name || 'Неизвестен'}
            </Text>
          </View>
        </Header>
        <FlatList
          inverted={false}
          data={messages}
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
          onContentSizeChange={scrollToBottom}
        />
        <View style={styles.inputContainer}>
          <InputMessage
            value={newMessage}
            onChangeText={setNewMessage}
            onSend={handleSendMessage}
          />
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerContent: { flexDirection: 'row', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textHeader: { alignSelf: 'center' },
  messageRow: { flexDirection: 'row', marginBottom: 12 },
  myMessageRow: { justifyContent: 'flex-end' },
  otherMessageRow: { justifyContent: 'flex-start' },
  messageContainer: { maxWidth: '70%', borderRadius: 10, padding: 10 },
  myMessage: { backgroundColor: '#DCF8C6' },
  otherMessage: { backgroundColor: '#E5E5EA' },
  myMesText: { color: '#000' },
  otherMesText: { color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  attachButton: { backgroundColor: '#F0F0F0', padding: 10, borderRadius: 9999 },
});

export default UserChat;

