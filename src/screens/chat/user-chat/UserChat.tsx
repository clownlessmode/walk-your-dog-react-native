import GoBack from '@features/go-back/GoBack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screens } from '@shared/types/screens.type';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import InputMessage from '@shared/ui/input-message/InputMessage';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
type UserChatRouteProp = RouteProp<Screens, 'userChat'>;
function UserChat() {
  const route = useRoute<UserChatRouteProp>();
  const { chat } = route.params;
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Нам нужно разрешение на доступ к вашей галерее');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const renderMessage = ({
    item,
  }: {
    item: { id: string; sender: 'me' | 'other'; text: string };
  }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'me' ? styles.myMessageRow : styles.otherMessageRow,
      ]}
    >
      {item.sender === 'other' && (
        <Image
          source={require('@assets/signUp/avatarUser.png')}
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.messageContainer,
          item.sender === 'me' ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            globalStyles.text500,
            item.sender === 'me' ? styles.myMesText : styles.otherMesText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
  
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Image
            source={require('@assets/signUp/avatarUser.png')}
            style={styles.avatar}
          />
          <Text style={[globalStyles.text500, styles.textHeader]}>
            {chat.name}
          </Text>
        </View>
      </Header>
      <FlatList
        data={chat.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
      />
       {selectedImages.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 8 }}>
          {selectedImages.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.image}
            />
          ))}
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: "center", gap: 8, paddingVertical: 14}}>
      <TouchableOpacity
          style={{ backgroundColor: '#F0F0F0', padding: 10, borderRadius: 9999 }}
          onPress={pickImage}
        >
          <Feather name="paperclip" size={20} color="black" />
        </TouchableOpacity>
        <InputMessage />
      </View>
    </ScreenContainer>
  );
}

export default UserChat;
