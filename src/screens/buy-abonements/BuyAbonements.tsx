import { useAbonementsController } from '@entity/abonements/abonements.controller';
import DrawBuyAbonements from '@features/buy-abonements/DrawBuyAbonements';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Drawer from '@shared/ui/drawer/Drawer';
import Header from '@shared/ui/header/Header';
import Ticket from '@shared/ui/ticket/Ticket';
import { abonementWorlds } from '@shared/utils/abonementWorlds';
import React from 'react';

function BuyAbonements() {
  const { allAbonements, postAbonements } = useAbonementsController();
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Приобрести абонементы</Header>
      {allAbonements?.map((abonement: any) => (
        <Drawer
        key={abonement.id}
          trigger={
            
            <Ticket
              count={abonement.total}
              total={abonement.total}
              title={abonementWorlds(abonement.abonementType, abonement.total)}
            />
          }
        >
          <DrawBuyAbonements
            id={abonement.id}
            count={abonement.count}
            total={abonement.total}
            date={abonement.date}
            title={abonement.abonementType}
            price={abonement.price}
          />
        </Drawer>
      ))}
    </ScreenContainer>
  );
}

export default BuyAbonements;
