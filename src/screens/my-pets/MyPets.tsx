import { Pet } from '@entity/pets/model/pet.interface';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import AddMore from '@shared/ui/add-more/AddMore';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import React from 'react';
import { View } from 'react-native';

function MyPets() {
  const { user } = useUserStore();
  const navigation = useAppNavigation()

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('petDetails', { pet }); // Переходим к PetDetails и передаем выбранного питомца
    console.log(pet)
  };
  return (
    <ScrollContainer header={<Header before={<GoBack />}>Мои питомцы</Header>}>
      <View style={{gap: 20}}>
        <PetInfo pet={user?.pets || []} onPress={handlePetPress}/>
        <AddMore title='Добавить еще питомца' onPress={() => navigation.navigate('signUpPet')}/>
      </View>
    </ScrollContainer>
  );
}

export default MyPets;
