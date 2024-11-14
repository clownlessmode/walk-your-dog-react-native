import { useAbonementsController } from '@entity/abonements/abonements.controller';
import { AbonementRo } from '@entity/abonements/modal/abonements.interface';
import DrawBuyAbonements from '@features/buy-abonements/DrawBuyAbonements';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Drawer from '@shared/ui/drawer/Drawer';
import Header from '@shared/ui/header/Header';
import Ticket from '@shared/ui/ticket/Ticket';
import { abonementWorlds } from '@shared/utils/abonementWorlds';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

function BuyAbonements() {
  const { allAbonements, postAbonements, loadAllAbonements } =
    useAbonementsController();
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Приобрести абонементы</Header>
      {loadAllAbonements ? ( // Check if loading
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      ) : (
        allAbonements?.map((abonement: AbonementRo) => (
          <Drawer
            key={abonement.id}
            trigger={
              <Ticket
                count={abonement.total}
                total={abonement.total}
                title={abonement.abonementType.name}
              />
            }
          >
            <DrawBuyAbonements
              id={abonement.id}
              count={abonement.total}
              total={abonement.total}
              title={abonement.abonementType.name}
              price={abonement.price}
            />
          </Drawer>
        ))
      )}
    </ScreenContainer>
  );
}

export default BuyAbonements;
