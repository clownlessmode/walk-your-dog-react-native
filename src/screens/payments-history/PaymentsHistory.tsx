import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PaymentsRo } from '@entity/payments/model/payment.interface';
import { usePaymentsController } from '@entity/payments/payments.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import PaymentsInfo from '@shared/ui/payments-info/PaymentsInfo';
import { useServiceController } from '@entity/service/service.controller';

interface GroupedPayments {
  year: number;
  month: string;
  days: {
    day: string;
    payments: PaymentsRo[];
  }[];
}

function PaymentsHistory() {
  const { user } = useUserStore();
  const { paymentsHistory } = usePaymentsController(user?.id);

  if (!paymentsHistory) {
    return (
      <ScreenContainer>
        <Header before={<GoBack />}>История счета</Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      </ScreenContainer>
    );
  }

  const groupPaymentsByDate = (payments: PaymentsRo[]): GroupedPayments[] => {
    const groupedPayments: { [key: string]: GroupedPayments } = {};

    payments.forEach((payment) => {
      const date = new Date(payment.created_at);
      const year = date.getFullYear();
      const month = date.toLocaleString('ru-RU', { month: 'long' });
      const day = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
      }); // Например, "7 июня"

      const key = `${year}-${month}`;

      if (!groupedPayments[key]) {
        groupedPayments[key] = { year, month, days: [] };
      }

      // Найдем или создадим запись для конкретного дня
      let dayGroup = groupedPayments[key].days.find((d) => d.day === day);
      if (!dayGroup) {
        dayGroup = { day, payments: [] };
        groupedPayments[key].days.push(dayGroup);
      }

      dayGroup.payments.push(payment);
    });

    return Object.values(groupedPayments);
  };

  const groupedData = groupPaymentsByDate(paymentsHistory);
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>История счета</Header>
      {paymentsHistory.length === 0 && (
    <View style={{width: '100%', alignItems: 'center' }}>
      <Text style={[globalStyles.text500, {fontSize: 16}]}>У вас еще не было денежных операций</Text>
    </View>
  )}
      <FlatList
        data={groupedData}
        keyExtractor={(item) => `${item.year}-${item.month}`} // Уникальный ключ для каждого элемента
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={[globalStyles.text500, styles.year]}>{item.year}</Text>
            <Text style={[globalStyles.text600, styles.month]}>
              {item.month}
            </Text>

            {item.days.map((dayItem) => (
              <View
                key={`${item.year}-${item.month}-${dayItem.day}`}
                style={styles.daySection}
              >
                <Text style={[globalStyles.text500, styles.day]}>
                  {dayItem.day}
                </Text>
                {dayItem.payments.map((payment: PaymentsRo) => {
                  const date = new Date(payment.created_at);
                  const time = date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });

                  return (
                    <PaymentsInfo
                      key={payment.id}
                      type={payment.type}
                      time={time}
                      total={payment.total}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  year: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  month: {
    fontSize: 24,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  daySection: {
  },
  day: {
    fontSize: 14,
    textTransform: 'capitalize',
    marginBottom: 5,
    color: '#ADADAD',
  },
});

export default PaymentsHistory;
