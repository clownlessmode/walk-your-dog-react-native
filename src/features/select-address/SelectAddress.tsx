import React, { useRef, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import useUserStore from '@entity/users/user.store';
import { Ionicons } from '@expo/vector-icons';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import styles from './styles';

interface Props {
  onAddressSelect: (address: any) => void;
}

function SelectAddress({ onAddressSelect }: Props) {
  const { user } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const addresses = user?.meta.addresses || [];

  const onViewRef = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        setCurrentIndex(newIndex);
        onAddressSelect(addresses[newIndex]);
      }
    },
    [addresses, onAddressSelect]
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <FlatList
        data={addresses}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.blockAddress}>
            <ServiceInput title={'Адрес'} description={item.address} />
          </TouchableOpacity>
        )}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Индикатор пагинации (точки) */}
      <View style={styles.pagination}>
        {addresses.map((_, index) => (
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

export default SelectAddress;
