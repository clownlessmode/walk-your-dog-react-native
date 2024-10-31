import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import { Pet } from '@entity/pets/model/pet.interface';
import normalizeData from '@shared/utils/normalizeDate';

interface Props {
  variant?: 'grey' | 'light';
  pet: Pet | Pet[]; // Изменено на один объект Pet или массив
  onPress?: (pet: Pet) => void;
}

function PetInfo({ variant = 'grey', pet, onPress }: Props) {
  const petsArray = Array.isArray(pet) ? pet : [pet]; // Преобразуем в массив, если это один объект

  return (
    <View>
      {petsArray.map((p, index) => (
        <TouchableOpacity
          key={index}
          style={[variant === 'grey' ? styles.greyBlock : styles.lightBlock]}
          onPress={() => onPress && onPress(p)} // Обработка выбора питомца
        >
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Image style={styles.img} source={{ uri: p.image }} />
            <View style={{ flexDirection: 'column', justifyContent: "center" }}>
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>{p.name}</Text>
              <View style={styles.infoPet}>
                <Text style={[globalStyles.text400, { opacity: 0.5 }]}>{p.breed?.name}</Text>
                <Ionicons name="ellipse" size={4} color="grey" />
                <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
                  {normalizeData(typeof p.birthdate === 'string' ? p.birthdate : p.birthdate.toISOString())}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default PetInfo;
