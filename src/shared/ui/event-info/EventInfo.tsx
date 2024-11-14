import { ServiceCreateRo } from '@entity/service/model/service.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import formatMapText from '@shared/utils/formatMapText';
import normalizeData from '@shared/utils/normalizeDate';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import StatusText from '../status/Status';
import Executor from '../executor/Executor';
import useTime from '@shared/hooks/useTime';
import Button from '../button/Button';
interface Props {
  status: string;
  address: string;
  service: string;
  pet: string;
  pettype: string;
  time: string;
  price: number;
  comment?: string;
  worker?: {
    id: string;
    img: string;
    name: string;
    created_at: string;
    reviews: number;
  };
  additionalPet?: string;
  role?: 'CLIENT' | 'SITTER';
}

function EventInfo({
  status,
  address,
  service,
  pet,
  pettype,
  time,
  price,
  comment,
  worker,
  additionalPet,
  role = 'CLIENT',
}: Props) {
  //  const { time: timerTime } = useTime(time);

  //  // For a stopwatch (counting from now)
  //  const { time: stopwatchTime } = useTime();

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

  return (
    <View>
      <View style={{ gap: 14 }}>
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
            Исполнитель:
          </Text>
          {worker ? (
            <UserProfile
              name={worker.name}
              description={normalizeData(worker.created_at)}
              image={worker.img}
              additional={
                <TouchableOpacity
                  // onPress={() => navigation.navigate('reviews', event.worker.id)}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                    {worker.reviews}
                  </Text>
                  <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                    {reviewsText(worker.reviews)}
                  </Text>
                </TouchableOpacity>
              }
            />
          ) : (
            <View>
              <Executor />
            </View>
          )}
        </View>

        {role === 'SITTER' ? (
          <>
            <Button onPress={() => console.log("Связь с владельцем")}>Связаться с владельцем</Button>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => console.log("Чат с подержкой")}>
              <Text style={[globalStyles.text500]}>Чат с подержкой</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export default EventInfo;
