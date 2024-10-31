import DetailsItem from '@shared/ui/details-item/DetailsItem';
import { View } from 'react-native';
import styles from './styles';
import Logout from '@features/logout/Logout';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { Pet } from '@entity/pets/model/pet.interface';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import EventBlock from '@shared/ui/event-block/EventBlock';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import GoBack from '@features/go-back/GoBack';

const PetDetails = () => {
  const route = useRoute();
  const { pet } = route.params as { pet: Pet };
  const gender = pet.parameters.gender === 'MALE' ? 'Мальчик' : 'Девочка';
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMMM yyyy', { locale: ru });
  };
  return (
    <ScrollContainer
    header={<Header before={<GoBack />}>Профиль питомца</Header>}
    >
      <View style={styles.wrapper}>
        <PetInfo pet={[pet]} variant="light" />
        <EventBlock />
        <DetailsItem title="Кличка" description={pet.name} />
        <DetailsItem title="Порода" description={pet.breed?.name} />
        <DetailsItem
          title="Дата рождения"
          description={formatDate(pet.birthdate)}
        />
        <DetailsItem title="Пол" description={gender} />
        <DetailsItem
          title="Общее здоровье"
          description={pet.parameters.health}
        />
      </View>
    </ScrollContainer>
  );
};
export default PetDetails;
