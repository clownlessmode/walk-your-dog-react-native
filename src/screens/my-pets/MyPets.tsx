import { Pet } from '@entity/pets/model/pet.interface';
import { useAuthPetController } from '@entity/pets/pet.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import AddMore from '@shared/ui/add-more/AddMore';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

function MyPets() {
  const { user } = useUserStore();
  const { myPets, isLoadingMyPets } = useAuthPetController(user?.id);
  const navigation = useAppNavigation();

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('petDetails', { pet });
  };

  return (
    <ScrollContainer header={<Header before={<GoBack />}>Мои питомцы</Header>}>
      <View style={{ gap: 20 }}>
        {isLoadingMyPets ? (
          <View
            style={{
              flex: 1,
              height: 62,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size={'small'} color={'black'} />
          </View>
        ) : (
          <PetInfo pet={myPets || []} onPress={handlePetPress} />
        )}
        <AddMore
          title="Добавить еще питомца"
          onPress={() => navigation.navigate('signUpPet')}
        />
      </View>
    </ScrollContainer>
  );
}

export default MyPets;
