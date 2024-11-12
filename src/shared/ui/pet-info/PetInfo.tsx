import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import { Pet } from '@entity/pets/model/pet.interface';
import normalizeData from '@shared/utils/normalizeDate';

interface Props {
  variant?: 'grey' | 'light';
  pet: Pet | Pet[];
  onPress?: (pet: Pet) => void;
  selectedPet?: Pet | null;
}

function PetInfo({ variant = 'grey', pet, onPress, selectedPet }: Props) {
  const petsArray = Array.isArray(pet) ? pet : [pet]; // Преобразуем в массив, если это один объект

  return (
    <View style={{ gap: 10 }}>
      {petsArray.length === 0 && (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>У вас еще нет питомцев</Text>
        </View>
      )}
      {petsArray.map((p, index) => (
        <TouchableOpacity
          key={index}
          style={[
            variant === 'grey' ? styles.greyBlock : styles.lightBlock,
            selectedPet?.id === p.id ? styles.selectedPet : null,
          ]}
          onPress={() => onPress && onPress(p)}
        >
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Image
              style={styles.img}
              source={
                p.image
                  ? { uri: p.image }
                  : require('@assets/signUp/avatarPet.png')
              }
            />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                {p.name}
              </Text>
              <View style={styles.infoPet}>
                <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
                  {p.breed?.name}
                </Text>
                <Ionicons name="ellipse" size={4} color="grey" />
                <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
                  {normalizeData(
                    typeof p.birthdate === 'string'
                      ? p.birthdate
                      : p.birthdate.toISOString(),
                    true
                  )}
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
