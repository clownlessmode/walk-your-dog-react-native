import { Pet } from '@entity/pets/model/pet.interface';
import React from 'react';
import { Image, Text, View } from 'react-native';
import InputInfo from '../input-info/InputInfo';
import normalizeData from '@shared/utils/normalizeDate';
import { formatDate } from '@widgets/date-event-block/DateEventBlock';
import YaMap from '../map/Map';
import MyAddressMap from '../my-address-map/MyAddressMap';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import Button from '../button/Button';
import { User } from '@entity/users/model/user.interface';
import { Location } from '@screens/map/map.store';
import useUserStore from '@entity/users/user.store';
import useRoleStore from '@screens/auth/role.store';
import useTimerStore from '@widgets/time-progress/time.store';

interface Props {
  datetime?: string;
  nameService: string;
  pet: Pet;
  address: Location;
  addressMap?: Location;
  worker?: User;
  dateTimeFormat?: string;
  client?: User
  serviceId?: string 
}
function DrawerInfoEvent({
  datetime,
  nameService,
  pet,
  address,
  addressMap,
  worker,
  dateTimeFormat,
  client,
  serviceId
}: Props) {
  const { timers } = useTimerStore();
  const timeLeft = serviceId ? timers[serviceId]?.timeLeft ?? 0 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const {role} = useRoleStore()
  const gender = pet.parameters.gender === 'MALE' ? 'Мальчик' : 'Девочка';
  // const { dayMonth, hoursMinutes } = formatDate(datetime);
  const formatBirthdate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMMM yyyy', { locale: ru });
  };

  const parseDateTime = (dateStr?: string) => {
    if (!dateStr) return { dayMonth: 'Нет данных', hoursMinutes: '' };
    try {
      const parsedDate = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      return {
        dayMonth: format(parsedDate, 'd MMMM yyyy', { locale: ru }),
        hoursMinutes: format(parsedDate, 'HH:mm', { locale: ru }),
      };
    } catch (error) {
      console.error('Invalid datetime format:', error);
      return { dayMonth: 'Нет данных', hoursMinutes: '' };
    }
  };
  

  const { dayMonth, hoursMinutes } = parseDateTime(datetime);
  return (
    <View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Text style={[globalStyles.text500, { opacity: 0.5 }]}>{dayMonth}</Text>
      <Ionicons name="ellipse" size={4} color="grey" />
      <Text style={[globalStyles.text500, { opacity: 0.5 }]}>{hoursMinutes}</Text>
    </View>
    <View style={{ alignItems: 'center', gap: 8 }}>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>{nameService}</Text>
      <Image
        source={
          pet.image
            ? { uri: pet.image }
            : require('@assets/signUp/avatarPet.png')
        }
        style={{ width: 93, height: 93, borderRadius: 9999 }}
      />
      <Text style={[globalStyles.text500, { fontSize: 24 }]}>{pet.name}</Text>
    </View>
    <View>
      <InputInfo editable={false} title={'Питомец'} description={pet.name || 'Без имени'} />
      <InputInfo editable={false} title={'Порода'} description={pet.breed?.name || ''} />
      <InputInfo editable={false} title={'Дата рождения'} description={formatBirthdate(pet.birthdate)} />
      <InputInfo editable={false}title={'Пол'} description={gender} />
      {address.lat  ? <InputInfo title={'Адрес'} description={`${address.address}`} /> : <></>}

   
      <InputInfo
      editable={false}
          title={role === 'SITTER' ? 'Клиент' : 'Исполнитель'}
          description={
            role === 'SITTER'
              ? client?.meta.name || 'Нет данных'
              : worker?.meta.name || 'Нет данных'
          }
        />
         <InputInfo editable={false} title={'Осталось времени для заполнения отчета'} description={formattedTime} />
    </View>
  </View>
  );
}

export default DrawerInfoEvent;
