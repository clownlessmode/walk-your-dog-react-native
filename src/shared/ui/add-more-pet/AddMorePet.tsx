import { AntDesign } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

function AddMorePet() {
  const navigation = useAppNavigation();
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate('signUpPet')}
    >
      <Text style={globalStyles.text500}>
        Добавить еще питомца
      </Text>
      <AntDesign name="plussquareo" size={18} color="black" />
    </TouchableOpacity>
  );
}

export default AddMorePet;
