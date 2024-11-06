import { useAbonementsController } from '@entity/abonements/abonements.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import Ticket from '@shared/ui/ticket/Ticket';
import { abonementWorlds } from '@shared/utils/abonementWorlds';
import React from 'react';
import { FlatList, View } from 'react-native';

function Abonements() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { myAbonements } = useAbonementsController(user?.id);
  const getTranslatedTitle = (type: string) => {
    if (type === 'WALKING') return 'Прогулка';
    return type;
  };
  const renderItem = ({ item }: { item: any }) => (
    <View style={{ gap: 16 }}>
      <Ticket
        key={item.abonement.id}
        count={item.abonement.total}
        total={item.abonement.total}
        title={abonementWorlds(
          item.abonement.abonementType,
          item.abonement.total
        )}
      />
    </View>
  );
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Абонементы</Header>
      <FlatList
        data={myAbonements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Button onPress={() => navigation.navigate('buyAbonements')}>
        Приобрести абонемент
      </Button>
    </ScreenContainer>
  );
}

export default Abonements;
