import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUserStore from '@entity/users/user.store';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import styles from './styles';

interface Props {
  onPetSelect: (animal: any) => void;
}

function SelectPet({ onPetSelect }: Props) {
  const { user } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
      onPetSelect(user?.pets[newIndex]); // передаем выбранного питомца в onPetSelect
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <FlatList
        data={user?.pets}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.blockPeet}>
            <PetInfo pet={item} variant='light'/>
          </View>
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Индикатор пагинации (точки) */}
      <View style={styles.pagination}>
        {user?.pets.map((_, index) => (
          <Ionicons
            key={index}
            name="ellipse"
            size={8}
            color={index === currentIndex ? 'black' : 'grey'}
            style={{ margin: 3 }}
          />
        ))}
      </View>
    </View>
  );
}
export default SelectPet;
