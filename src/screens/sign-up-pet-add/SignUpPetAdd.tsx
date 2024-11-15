import useUserStore from '@entity/users/user.store';
import AddForm from '@features/add-info-pet/Form';
import GoBack from '@features/go-back/GoBack';
import { useRoute } from '@react-navigation/native';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

function SignUpPetAdd() {
  const route = useRoute();
  const { petId } = route.params as { petId: string };
  console.log(petId)
  if (!petId) {
    return null;
  }
  return (
    <ScrollContainer
      header={
        <Header>Дополнительная информация о питомце</Header>
      }
    >
        
      <AddForm petId={petId} />
     
    </ScrollContainer>
  );
}

export default SignUpPetAdd;
