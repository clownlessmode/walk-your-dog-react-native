import { Pet } from '@entity/pets/model/pet.interface';
import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import SelectPet from '@features/select-pet/SelectPet';
import useServiceStore from '@screens/service/service.store';
import globalStyles from '@shared/constants/globalStyles';
import AddService from '@shared/ui/add-service/AddService';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import RadioButton from '@shared/ui/radio-button/RadioButton';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import SelectAddress from '@features/select-address/SelectAddress';
import { Location } from '@screens/map/map.store';
import Drawer from '@shared/ui/drawer/Drawer';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import SelectedTime from '@features/selected-time/SelectedTime';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Input from '@shared/ui/input/Input';
import Balances from '@shared/ui/balances/Balances';
import Toast from 'react-native-toast-message';
import Error from '@shared/ui/error/Error';

function Form() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { allService, isLoadService } = useServiceController();
  const {
    createService,
    isLoadingCreateServices,
    isErrorCreateServices,
    errorCreateServices,
  } = useServiceController();
  const {
    setService,
    removeService,
    setAddress,
    setDate,
    services,
    date,
    address,
    setSelectedPet,
    selectedPet,
  } = useServiceStore();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      pet: user?.pets[0].id,
      address: user?.meta.addresses[0].id,
      date: new Date().toISOString(),
      comment: '',
    },
  });
  const validateForm = (data: any) => {
    if (!user?.id) {
      return 'Ошибка: пользователь не авторизован';
    }

    if (!selectedMainService?.mainId) {
      return 'Пожалуйста, выберите основную услугу';
    }

    if (!data.pet) {
      return 'Пожалуйста, выберите питомца';
    }

    if (!data.address) {
      return 'Пожалуйста, выберите адрес';
    }

    if (!data.date) {
      return 'Пожалуйста, выберите дату и время';
    }

    const selectedService = allService.find(
      (service: any) => service.id === selectedMainService?.mainId
    );

    const selectedDate = new Date(data.date);
    const currentDate = new Date();
    const timeDifference =
      (selectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60); // разница в часах

    if (selectedDate < currentDate) {
      return 'Выбранная дата не может быть в прошлом';
    }

    if (selectedService?.name === 'Срочный выгул' && timeDifference > 2) {
      return 'Срочный выгул можно выбрать только до 2 часов от текущего времени';
    }

    if (selectedService?.name !== 'Срочный выгул' && timeDifference < 2) {
      return 'Эту услугу можно выбрать только более, чем за 2 часа от текущего времени';
    }

    return null;
  };
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSumbit = async (data: any) => {
    let validationError = validateForm(data);
    if (selectedMainService?.mainId === undefined) {
      validationError = 'Пожалуйста, выберите основную услугу';
    }

    if (validationError) {
      setValidationError(validationError);
      return;
    }
    setValidationError(null);
    const formattedData = {
      mainServiceId: selectedMainService?.mainId as any,
      customerId: user?.id as any,
      petId: data.pet as any,
      addressId: data.address as any,
      datetime: data.date as any,
      subServiceIds: selectedMainService?.subMainIds as any[],
      balanceType: balanceType as any,
      comment: data.comment as any,
    };
    console.info('FORMATTED DATA: ', formattedData);
    const response = await createService(formattedData);

    if (response) navigation.navigate('appStack');
  };

  if (isErrorCreateServices) {
    Toast.show({
      type: 'error',
      text1: 'Ошибка',
      text2: 'Недостаточно средств для оплаты',
      onPress: () => {
        navigation.navigate('deposit');
      },
    });
  }

  const [selectedMainService, setSelectedMainService] = useState<{
    mainId: string;
    subMainIds: string[];
  } | null>(null);

  const [selectedDateDescription, setSelectedDateDescription] = useState(
    format(new Date(), 'd MMMM, HH:mm', { locale: ru })
  );

  const handleDateChange = (dateValue: any) => {
    setSelectedDateDescription(
      format(new Date(dateValue), 'd MMMM, HH:mm', { locale: ru })
    );
  };

  const handleServiceToggle = (
    service: any,
    price: any,
    selected: any,
    isMainService: boolean = true
  ) => {
    setSelectedMainService((prev) => {
      if (isMainService) {
        if (selected) {
          // Deselect the previous main service and its additional services, if any
          if (prev) {
            removeService(prev.mainId);
            prev.subMainIds.forEach((subId) => removeService(subId));
          }
          // Set the new main service and initialize subMainIds
          setService({ service, price });
          return { mainId: service.id, subMainIds: [] };
        } else {
          // If main service is deselected, clear it completely
          removeService(service);
          return null;
        }
      } else {
        // Handle additional service toggling for the selected main service
        if (prev && prev.mainId === service.main_id) {
          if (selected) {
            setService({ service, price });
            return {
              ...prev,
              subMainIds: [...prev.subMainIds, service.id],
            };
          } else {
            removeService(service);
            return {
              ...prev,
              subMainIds: prev.subMainIds.filter((id) => id !== service.id),
            };
          }
        }
        return prev;
      }
    });
  };

  // Function to check if the current main service is selected
  const isMainServiceSelected = (mainId: string) =>
    selectedMainService?.mainId === mainId;

  const [balanceType, setBalanceType] = useState<'general' | 'promo'>(
    'general'
  );
  if (!user) return;
  const userBalance =
    balanceType === 'general' ? user.balance.general : user.balance.promo;
  return (
    <ScrollView style={{ padding: 0, flex: 1 }}>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#F4F4F4',
          gap: 16,
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <Controller
          control={control}
          name="pet"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <SelectPet onPetSelect={(value: Pet) => onChange(value.id)} />
          )}
        />
        {isLoadService ? (
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="small" color="#9D9D9D" />
          </View>
        ) : (
          <View style={styles.serviceContainer}>
            {allService &&
              allService.map((service: any) => (
                <>
                  <View key={service.id}>
                    <Controller
                      control={control}
                      name={service.name.toLowerCase()}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <>
                          <RadioButton
                            price={parseFloat(service.price)}
                            showInfoButton={true}
                            title={service.name}
                            checked={value}
                            onPress={() => {
                              const isSelected = !value;
                              onChange(isSelected);
                              handleServiceToggle(
                                service,
                                parseFloat(service.price),
                                isSelected,
                                true // true indicates main service
                              );
                            }}
                            disabled={
                              selectedMainService &&
                              !isMainServiceSelected(service.id)
                            }
                          />
                          {fieldState.error && (
                            <Error
                              style={{ justifyContent: 'flex-start' }}
                              title={fieldState.error.message}
                            />
                          )}
                        </>
                      )}
                    />
                    {isMainServiceSelected(service.id) &&
                      service.additional &&
                      service.additional.length > 0 && (
                        <View style={{ gap: 10 }}>
                          <Text
                            style={[globalStyles.text500, { fontSize: 16 }]}
                          >
                            Дополнительно
                          </Text>
                          <View style={styles.addBlock}>
                            {service.additional.map(
                              (additionalService: any) => (
                                <Controller
                                  key={additionalService.id}
                                  control={control}
                                  name={additionalService.name.toLowerCase()}
                                  render={({ field: { onChange, value } }) => (
                                    <AddService
                                      checked={value}
                                      title={additionalService.name}
                                      price={parseFloat(
                                        additionalService.price
                                      )}
                                      onPress={() => {
                                        onChange(!value);
                                        handleServiceToggle(
                                          additionalService,
                                          parseFloat(additionalService.price),
                                          !value,
                                          false // false indicates additional service
                                        );
                                      }}
                                      disabled={
                                        !isMainServiceSelected(service.id)
                                      } // Disable if main service is not selected
                                    />
                                  )}
                                />
                              )
                            )}
                          </View>
                        </View>
                      )}
                  </View>
                  <View style={styles.line} />
                </>
              ))}
          </View>
        )}
        <Controller
          control={control}
          name="address"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <SelectAddress
                onAddressSelect={(value: Location) => onChange(value.id)}
              />
            );
          }}
        />

        <Drawer
          hasBackdrop={true}
          trigger={
            <ServiceInput title="Дата" description={selectedDateDescription} />
          }
        >
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <SelectedTime
                onChange={(dateValue) => {
                  onChange(dateValue);
                  handleDateChange(dateValue);
                }}
                value={value}
              />
            )}
          />
        </Drawer>
        <Controller
          control={control}
          name="comment"
          rules={{ required: false }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Дополнительная информация"
            />
          )}
        />
        <Balances balanceType={balanceType} selectedBalance={setBalanceType} />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {validationError && (
          <Error title={validationError} style={{ marginBottom: 16 }} />
        )}

        <Button
          isLoading={isLoadingCreateServices}
          onPress={handleSubmit(onSumbit)}
        >
          Далее
        </Button>
      </View>
    </ScrollView>
  );
}

export default Form;
