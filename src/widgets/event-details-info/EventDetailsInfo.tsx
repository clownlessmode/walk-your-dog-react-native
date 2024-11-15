import { ServiceCreateRo } from '@entity/service/model/service.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import formatMapText from '@shared/utils/formatMapText';
import normalizeData from '@shared/utils/normalizeDate';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '@shared/constants/globalStyles';
import StatusText from '@shared/ui/status/Status';
import Button from '@shared/ui/button/Button';
import styles from './styles';
import { User } from '@entity/users/model/user.interface';
import { Pet } from '@entity/pets/model/pet.interface';
import { AntDesign } from '@expo/vector-icons';
import PetCard from '@widgets/pet-card/PetCard';
import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import Toast from 'react-native-toast-message';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
interface Props {
  status: string;
  address: string;
  service: string;
  pet: string;
  img: string;
  pettype: string;
  time: string;
  price: number;
  comment?: string;
  additionalPet?: string;
  role?: 'CLIENT' | 'SITTER';
  nameClient?: string;
  phoneClient?: string;
  petAll?: Pet;
  serviceId: string
}

function EventDetailsItem({
  status,
  address,
  service,
  pet,
  pettype,
  time,
  price,
  comment,
  additionalPet,
  nameClient,
  phoneClient,
  petAll,
  img,
  serviceId,
  role = 'CLIENT',
}: Props) {
  const navigation = useAppNavigation()
    const {user} = useUserStore()
    // console.log('Отдаю', user?.id)
    const {assignWorker, isLoadingAssignWorker} = useServiceController()
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [submitted, setSubmitted] = useState(!!petAll?.parameters.homeName);
  const getRussianEnding = (number: number, words: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const mod =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)];
    return words[mod];
  };
  const reviewsText = (count: number) =>
    `${getRussianEnding(count, ['отзыв', 'отзыва', 'отзывов'])}`;


  const handleAssignWorker = async () => {
    if (serviceId && user?.id) {
      try {
        const response = await assignWorker({ serviceId, workerId: user.id });
        Toast.show({
          type:'success',
          text1: 'Успешно',
          text2: 'Вы успешно взяли заказ!',
        })
        navigation.goBack()
      } catch (error) {
        console.error("Ошибка при назначении работника:", error);
        Toast.show({
          type:'error',
          text1: 'Ошибка',
          text2: 'Произошла ошибка!',
        })
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{ gap: 14, paddingBottom: 30 }]}>
        <View style={styles.wrapper}>
          <StatusText status={status} />
          <Text>{formatMapText(address)}</Text>
        </View>
        <View style={styles.horizontalLine} />
        {/*  */}
        <View style={styles.event}>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            {service}
          </Text>
          <View style={styles.horizontalLine} />
          <View style={styles.row}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>{pet}</Text>
            <Text style={{ fontSize: 18, opacity: 0.5 }}>|</Text>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              {pettype}
            </Text>
            <Text style={{ fontSize: 18, opacity: 0.5 }}>|</Text>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>{time}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>
            {price <= 0
              ? 'Оплачено абонементом'
              : `Стоимость заказа: ${price} ₽`}
          </Text>
        </View>
        {/*  */}

        {comment ? (
          <View style={{ gap: 2 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Комментарий:
            </Text>
            <Text style={[globalStyles.text400, { color: '#949494' }]}>
              {comment}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {role === 'SITTER' ? (
          <View style={{ gap: 2 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Особенности питомца:
            </Text>
            <Text style={[globalStyles.text400, { color: '#949494' }]}>
              {additionalPet}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{ gap: 10 }}>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>
            Хозяин питомца:
          </Text>
          <View style={styles.blockUser}>
            <Image
              source={
                img ? { uri: img } : require('@assets/signUp/avatarUser.png')
              }
              style={styles.img}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                {nameClient}
              </Text>
              <Text style={[globalStyles.text400, { opacity: 0.5 }]}>
                {phoneClient}
              </Text>
            </View>
          </View>
          <View style={{ gap: 2 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Общее здоровье:
            </Text>
            <Text style={[globalStyles.text400, { color: '#949494' }]}>
              {additionalPet}
            </Text>
          </View>
        </View>
        <View>
          {petAll && (petAll.parameters.homeName || submitted) ? (
            <View style={{ gap: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}
                onPress={() => setShowAddInfo(!showAddInfo)}
              >
                <Text style={[globalStyles.text600]}>
                  Просмотреть полную информацию о питомце
                </Text>
                <AntDesign
                  name={showAddInfo ? 'up' : 'down'}
                  size={18}
                  color="black"
                />
              </TouchableOpacity>

              {showAddInfo && <PetCard pet={petAll} />}
            </View>
          ) : null}
        </View>
        <View style={[showAddInfo ? {paddingBottom: 60} : {paddingBottom: 0}]}>
        <Button isLoading={isLoadingAssignWorker} onPress={handleAssignWorker}>Взять заказ</Button>
        </View>
        {role === 'SITTER' ? (
          <>
            <Button onPress={() => console.log('Связь с владельцем')}>
              Связаться с владельцем
            </Button>
            <TouchableOpacity onPress={() => console.log('Чат с подержкой')}>
              <Text>Чат с поддержкой</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
         
      </View>
      </ScrollView>
  );
}

export default EventDetailsItem;
