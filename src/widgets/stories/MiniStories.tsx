import Story from '@entity/stories/model/stories.interface';
import globalStyles from '@shared/constants/globalStyles';
import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native';


export type MiniStoriesProps = {
  stories: Story[];
  onStoryPress: (id: string) => void;
};

export type FullScreenStoryProps = {
  story: Story;
  isVisible: boolean;
  onClose: () => void;
  onNextStory: () => void;
};

const MiniStories: React.FC<MiniStoriesProps> = ({ stories, onStoryPress }) => (
  <FlatList
    data={stories}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{gap: 10, paddingHorizontal: 15, overflow: 'hidden', maxHeight: 105}}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={{ borderRadius: 16, overflow: 'hidden' }}
        onPress={() => onStoryPress(item.id)}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={{
            paddingVertical: 9,
            width: 100,
            height: 100,
            margin: 5,
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#8C8C8C',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text style={[globalStyles.text500, { color: 'white', fontSize: 12 }]}>
              {item.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )}
  />
);

export default MiniStories;
