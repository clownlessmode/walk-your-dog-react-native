// import GoBack from '@features/go-back/GoBack';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { Screens } from '@shared/types/screens.type';
// import ScreenContainer from '@shared/ui/containers/ScreenContainer';
// import Header from '@shared/ui/header/Header';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// // import styles from './styles';
// import globalStyles from '@shared/constants/globalStyles';
// import InputMessage from '@shared/ui/input-message/InputMessage';
// import { Feather } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { useChatsController } from '@entity/chats/chats.controller';
// import { Chat, Message } from '@entity/users/model/user.interface';
// import { useSocket } from '@app/providers/SocketContext';
// import useUserStore from '@entity/users/user.store';
// type UserChatRouteProp = RouteProp<Screens, 'userChat'>;
// function UserChat() {
//   const { user } = useUserStore();
//   const route = useRoute<UserChatRouteProp>();
//   const { socket } = useSocket();
//   const { id } = route.params;
//   if (!id) return null;

//   const { chat, isLoadingChat } = useChatsController(id);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const [newMessage, setNewMessage] = useState('');

//   const flatListRef = useRef<FlatList>(null);

//   const scrollToBottom = () => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   };

//   // useEffect(() => {
//   //   if (chat?.messages) {
//   //     setMessages(chat.messages);
//   //     scrollToBottom();
//   //   }
//   // }, [chat]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (!socket || !id) return;
//     socket.emit('joinChat', { chatId: id });
//     const handleNewMessage = (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       scrollToBottom();
//     };
//     socket.on(`newMessage_${id}`, handleNewMessage);
//     return () => {
//       socket.off(`newMessage_${id}`, handleNewMessage);
//     };
//   }, [socket, id]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !socket || !id || !user) return;

//     const tempMessage: Message = {
//       id: Date.now().toString(),
//       sender: user,
//       content: newMessage.trim(),
//       isRead: false,
//       chat: { id } as Chat,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     };
//     scrollToBottom();
//     socket.emit('sendMessage', { chatId: id, content: tempMessage.content });
//     // setMessages((prevMessages) => [...prevMessages, tempMessage]);
//     setNewMessage('');
//   };
//   if (isLoadingChat) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   const renderMessage = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageRow,
//         item.sender.id === user?.id
//           ? styles.myMessageRow
//           : styles.otherMessageRow,
//       ]}
//     >
//       {item.sender.id !== user?.id && (
//         <Image
//         source={
//           user?.meta.image
//             ? { uri: user?.meta.image }
//             : require('@assets/signUp/avatarUser.png')
//         }
//           style={styles.avatar}
//         />
//       )}
//       <View
//         style={[
//           styles.messageContainer,
//           item.sender.id === user?.id ? styles.myMessage : styles.otherMessage,
//         ]}
//       >
//         <Text
//           style={[
//             globalStyles.text500,
//             item.sender.id === user?.id
//               ? styles.myMesText
//               : styles.otherMesText,
//           ]}
//         >
//           {item.content}
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <ScreenContainer>
//       <Header before={<GoBack />}>
//         <View style={styles.headerContent}>
//           <Image
//            source={
//             user?.meta.image
//               ? { uri: user?.meta.image }
//               : require('@assets/signUp/avatarUser.png')
//           }
//             style={styles.avatar}
//           />
//           <Text style={[globalStyles.text500, styles.textHeader]}>
//             {chat && chat[0].chat.user2.meta.name}
//           </Text>
//         </View>
//       </Header>
//       <FlatList
//         inverted={false}
//         data={messages}
//         showsVerticalScrollIndicator={false}
//         initialScrollIndex={messages.length - 1}
//         maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         ref={flatListRef}
//         onContentSizeChange={scrollToBottom}
//       />
//       <View style={styles.inputContainer}>
//         {/* <TouchableOpacity style={styles.attachButton}>
//           <Feather name="paperclip" size={20} color="black" />
//         </TouchableOpacity> */}
//         <InputMessage
//           value={newMessage}
//           onChangeText={setNewMessage}
//           onSend={handleSendMessage}
//         />
//       </View>
//     </ScreenContainer>
//   );
// }

// const styles = StyleSheet.create({
//   loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   headerContent: { flexDirection: 'row', gap: 12 },
//   avatar: { width: 40, height: 40, borderRadius: 20 },
//   textHeader: { alignSelf: 'center' },
//   messageRow: { flexDirection: 'row', marginBottom: 12 },
//   myMessageRow: { justifyContent: 'flex-end' },
//   otherMessageRow: { justifyContent: 'flex-start' },
//   messageContainer: { maxWidth: '70%', borderRadius: 10, padding: 10 },
//   myMessage: { backgroundColor: '#DCF8C6' },
//   otherMessage: { backgroundColor: '#E5E5EA' },
//   myMesText: { color: '#000' },
//   otherMesText: { color: '#000' },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingVertical: 14,
//   },
//   attachButton: { backgroundColor: '#F0F0F0', padding: 10, borderRadius: 9999 },
// });

// export default UserChat;

import { useSocket } from '@app/providers/SocketContext';
import { useChatsController } from '@entity/chats/chats.controller';
import { Message } from '@entity/users/model/user.interface';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { RouteProp, useRoute } from '@react-navigation/native';
import globalStyles from '@shared/constants/globalStyles';
import { Screens } from '@shared/types/screens.type';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import InputMessage from '@shared/ui/input-message/InputMessage';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
type UserChatRouteProp = RouteProp<Screens, 'userChat'>;
function UserChat() {
  const { socket } = useSocket();
  const route = useRoute<UserChatRouteProp>();
  const { id } = route.params;

  if (!id) return null;
  const { user } = useUserStore();
  const { messages, isLoadingMessages } = useChatsController(id);
  const [stateMessages, setStateMessages] = useState<Message[]>([]);
  const [newMessages, setNewMessage] = useState('');

  const flatListRef = useRef<FlatList>(null);
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (messages) {
      setStateMessages(messages);
    }
  }, []);

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
            user?.meta.image
              ? { uri: user?.meta.image }
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
    <ScreenContainer>
      <Header before={<GoBack />}>
        <View style={styles.headerContent}>
          <Image
            source={
              user?.meta.image
                ? { uri: user?.meta.image }
                : require('@assets/signUp/avatarUser.png')
            }
            style={styles.avatar}
          />
          <Text style={[globalStyles.text500, styles.textHeader]}>
            {stateMessages.length > 0 && stateMessages[0].chat.user2.meta.name}
          </Text>
        </View>
      </Header>
      <FlatList
        inverted={false}
        data={stateMessages}
        showsVerticalScrollIndicator={false}
        // initialScrollIndex={stateMessages.length - 1}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        onContentSizeChange={scrollToBottom}
      />
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity style={styles.attachButton}>
              <Feather name="paperclip" size={20} color="black" />
            </TouchableOpacity> */}
        {/* <InputMessage
          value={newMessage}
          onChangeText={setNewMessage}
          onSend={handleSendMessage}
        /> */}
      </View>
    </ScreenContainer>
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
