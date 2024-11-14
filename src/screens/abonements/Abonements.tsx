import { useAbonementsController } from '@entity/abonements/abonements.controller';
import { AbonementBuyRo } from '@entity/abonements/modal/abonements.interface';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import Ticket from '@shared/ui/ticket/Ticket';
import { abonementWorlds } from '@shared/utils/abonementWorlds';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function Abonements() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { myAbonements, loadAbonements } = useAbonementsController(user?.id);
  const getTranslatedTitle = (type: string) => {
    if (type === 'WALKING') return 'Прогулка';
    return type;
  };
  const renderItem = ({ item }: { item: AbonementBuyRo }) => (
    <View style={{ gap: 16 }}>
      <Ticket
        key={item.abonement.id}
        count={item.remaining}
        total={item.abonement.total}
        title={abonementWorlds(
          item.abonement.abonementType.name,
          item.abonement.total
        )}
      />
    </View>
  );
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Абонементы</Header>
      {loadAbonements ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      ) : myAbonements.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={[globalStyles.text500, { fontSize: 18 }]}>
            У вас нет активных абонементов!
          </Text>
        </View>
      ) : (
        <FlatList
          data={myAbonements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button onPress={() => navigation.navigate('buyAbonements')}>
        Приобрести абонемент
      </Button>
    </ScreenContainer>
  );
}

export default Abonements;
