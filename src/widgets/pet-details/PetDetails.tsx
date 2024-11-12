import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import EventBlock from '@shared/ui/event-block/EventBlock';
import ScrollContainer from '@shared/ui/containers/ScrollContainer';
import Header from '@shared/ui/header/Header';
import GoBack from '@features/go-back/GoBack';
import ConfirmDeleteModal from '@shared/ui/confirm-delete/ConfirmDelete';
import Drawer from '@shared/ui/drawer/Drawer';
import DrawerInfoEvent from '@shared/ui/drawer-info-event/DrawerInfoEvent';
import AddForm from '@features/add-info-pet/Form';
import globalStyles from '@shared/constants/globalStyles';
import DetailsItem from '@shared/ui/details-item/DetailsItem';
import styles from './styles';
import { Pet } from '@entity/pets/model/pet.interface';
import { useAuthPetController } from '@entity/pets/pet.controller';
import { usePetServiceController } from '@entity/pet-service/pet-service.controller';
import PetCard from '@widgets/pet-card/PetCard';

const PetDetails = () => {
  const route = useRoute();
  const { pet } = route.params as { pet: Pet };
  const { getPetService, loadPetService } = usePetServiceController(pet?.id);
  const { deletePet } = useAuthPetController();

  const [modalVisible, setModalVisible] = useState(false);
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [submitted, setSubmitted] = useState(!!pet.parameters.homeName);

  const gender = pet.parameters.gender === 'MALE' ? 'Мальчик' : 'Девочка';

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMMM yyyy', { locale: ru });
  };

  const handleDelete = () => {
    deletePet(pet.id);
    setModalVisible(false);
  };

  return (
    <ScrollContainer
      header={<Header before={<GoBack />}>Профиль питомца</Header>}
    >
      <View style={styles.wrapper}>
        <View style={{ gap: 10 }}>
          <PetInfo pet={[pet]} variant="light" />

          {loadPetService ? (
            <View>
              <ActivityIndicator size={'small'} color={'black'} />
            </View>
          ) : getPetService.length > 0 ? (
            <View style={{ gap: 10 }}>
              <Text style={[globalStyles.text500, { opacity: 0.5 }]}>
                Ближайшие события
              </Text>
              <Drawer
                trigger={
                  <EventBlock
                    address={getPetService[0].address.address}
                    nameService={getPetService[0].mainService.name}
                    datetime={getPetService[0].datetime}
                  />
                }
              >
                <DrawerInfoEvent
                  datetime={getPetService[0].datetime}
                  nameService={getPetService[0].mainService.name}
                  pet={getPetService[0].pet}
                  address={getPetService[0].address.address}
                />
              </Drawer>
            </View>
          ) : (
            <></>
          )}
        </View>

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

        <TouchableOpacity
          style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}
          onPress={() => setShowAddInfo(!showAddInfo)}
        >
          <Text style={[globalStyles.text600]}>
            {pet.parameters.homeName || submitted
              ? 'Просмотреть полную информацию'
              : 'Добавить полную информацию'}
          </Text>
          <AntDesign
            name={showAddInfo ? 'up' : 'down'}
            size={18}
            color="black"
          />
        </TouchableOpacity>

        {showAddInfo &&
          (pet.parameters.homeName || submitted ? (
            <PetCard pet={pet}/>
          ) : (
            <AddForm
              setSubmitted={setSubmitted}
              setShowAddInfo={setShowAddInfo}
              pet={pet}
            />
          ))}

        <TouchableOpacity
          style={{ paddingTop: 15 }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[globalStyles.text600]}>Удалить питомца</Text>
        </TouchableOpacity>
        <ConfirmDeleteModal
          title={'Вы уверены, что хотите удалить питомца?'}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleDelete}
        />
      </View>
    </ScrollContainer>
  );
};

export default PetDetails;
