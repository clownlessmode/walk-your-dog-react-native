import { Pet } from '@entity/pets/model/pet.interface';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import AddMorePet from '@shared/ui/add-more-pet/AddMorePet';
import Button from '@shared/ui/button/Button';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import React, { useState } from 'react';
import { View } from 'react-native';
import useSelectPetStore from './select-pet.store';
import { useAuthPetController } from '@entity/pets/pet.controller';

function SelectPet() {
  const { user } = useUserStore();
  // console.log(user)
  const { myPets } = useAuthPetController(user?.id)
  const { setSelectPet } = useSelectPetStore();
  const navigation = useAppNavigation();
  const [selectedPet, setSelectedPetLocal] = useState<Pet | null>(null);
  const handlePetPress = (pet: Pet) => {
    setSelectedPetLocal(pet);
    console.log(pet)
  };

  const handleContinue = () => {
    if (selectedPet) {
      setSelectPet(selectedPet);
    } else {
      setSelectPet(myPets || []);
    }
    navigation.navigate('infoEvent');
  };
  return (
    <ScrollContainer
      style={{ paddingBottom: 20 }}
      header={<Header before={<GoBack />}>Выберите питомца</Header>}
    >
      <View style={{ gap: 20 }}>
          <PetInfo
            pet={myPets || []} // Передаем массив питомцев
            onPress={handlePetPress} // Обработка выбора питомца
            variant="grey"
          />
        <AddMorePet />
      </View>
      <Button onPress={handleContinue}>Далее</Button>
    </ScrollContainer>
  );
}

export default SelectPet;
