import option from '@features/sign-up-user/option';
import globalStyles from '@shared/constants/globalStyles';
import Button from '@shared/ui/button/Button';
import Drawer from '@shared/ui/drawer/Drawer';
import Dropdown from '@shared/ui/dropdown/Dropdown';
import Error from '@shared/ui/error/Error';
import Input from '@shared/ui/input/Input';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Switch from '@shared/ui/switch/Switch';
import { numberWalks } from './options/numberWalks';
import { attitudeDogs } from './options/attitudeDogs';
import { attitudePeople } from './options/attitudePeople';
import { training } from './options/training';
import { diet } from './options/diet';
import { howFindUs } from './options/howFindUs';
import { useAuthPetController } from '@entity/pets/pet.controller';
import { Pet } from '@entity/pets/model/pet.interface';
interface Props {
  pet: Pet
  setShowAddInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}
function AddForm({pet, setShowAddInfo, setSubmitted}:Props) {
  const {parametersPet, isLoadingParameters} = useAuthPetController(pet.id)
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      homeName: '',
      colorPet: '',
      weight: '',
      mark: '',
      placeMark: '',
      lastDayVaccine: '',
      demorwAndPreparation: '',
      operationsAndComplications: '',
      diseasesAndBoters: '',
      untied: true,
      lastDayPuppy: undefined,
      specialSigns: '',
      diet: [],
      favoriteTreats: '',
      separationExperience: true,
      behaviorAlone: '',
      characterTraits: '',
      whatLoves: '',
      whatDoesntLove: '',
      training: '',
      knowledgeTraining: '',
      attitudePeople: '',
      attitudeDogs: '',
      knowLeash: true,
      knowMuzzle: true,
      refusalMuzzle: '',
      badHabits: '',
      numberWalks: '',
      walkingTime: '',
      walkingFeatures: '',
      specialRequests: '',
      addressDog: '',
      preferredMessenger: '',
      returnOwner: true,
      trustedPerson: '',
      howFindUs: '',
    },
  });
  const onSubmit = async (data: any) => {
    const response = await parametersPet({...data})
    setShowAddInfo(false);
    setSubmitted(true);
  };
  return (
    <View style={{ gap: 20 }}>
      <Controller
        name="howFindUs"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 9999 }}>
            <Dropdown
              multiple={false}
              options={howFindUs}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Откуда вы узнали о нас?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="homeName"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 20,
            message: 'Имя не должно превышать 20 символов',
          },
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
            message: 'Разрешены только буквы',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Домашняя кличка"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="colorPet"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 20,
            message: 'Максимальное кол-во символов: 20',
          },
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
            message: 'Разрешены только буквы',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Окрас"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="weight"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 20,
            message: 'Максимальное кол-во символов: 20',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              keyboardType="number-pad"
              onChangeText={onChange}
              placeholder="Вес"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="mark"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 20,
            message: 'Максимальное кол-во символов: 20',
          },
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
            message: 'Разрешены только буквы',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Клеймо"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="placeMark"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 20,
            message: 'Максимальное кол-во символов: 20',
          },
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
            message: 'Разрешены только буквы',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Место клеймения"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="lastDayVaccine"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Дата последней прививки и вакцина"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="demorwAndPreparation"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Дата дегельминтизации и препарат"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="operationsAndComplications"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 150,
            message: 'Максимальное кол-во символов: 150',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Перенесённые операции и дата (осложнения)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="diseasesAndBoters"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 150,
            message: 'Максимальное кол-во символов: 150',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Перенесённые заболевания и дата (осложнения). Беспокоит ли это сегодня?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="untied"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Развязан?"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="lastDayPuppy"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) =>
          Platform.OS === 'ios' ? (
            <Drawer
              close={'Готово'}
              trigger={
                <View style={{ gap: 2, width: '100%' }}>
                  <View
                    style={
                      fieldState.error
                        ? styles.errorInputForIos
                        : styles.inputForIos
                    }
                  >
                    <Text style={[globalStyles.text400]}>
                      {value
                        ? new Date(value).toLocaleDateString('ru-RU')
                        : 'Дата последней пустовки или щенения'}
                    </Text>
                  </View>
                  {fieldState.error && (
                    <Error
                      style={{ justifyContent: 'flex-start' }}
                      title={fieldState.error.message}
                    />
                  )}
                </View>
              }
            >
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  // Обработка выбора даты
                  if (event.type === 'set' && selectedDate) {
                    onChange(selectedDate);
                  }
                }}
                textColor="black"
              />
            </Drawer>
          ) : (
            <>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => setModalVisible(true)}
              >
                <View style={{ gap: 2, width: '100%' }}>
                  <Input
                    editable={false}
                    placeholder={
                      value
                        ? new Date(value).toLocaleDateString('ru-RU')
                        : 'Дата последней пустовки или щенения'
                    }
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <Error
                      style={{ justifyContent: 'flex-start' }}
                      title={fieldState.error.message}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {modalVisible && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    // Обработка выбора даты
                    if (event.type === 'set' && selectedDate) {
                      onChange(selectedDate);
                      setModalVisible(false);
                    }
                  }}
                />
              )}
            </>
          )
        }
      />
      <Controller
        name="specialSigns"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Описание собаки (особые приметы)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="diet"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 97 }}>
            <Dropdown
              multiple={true}
              options={diet}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Рацион питания собаки?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="favoriteTreats"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Какие лакомства любит питомец?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="separationExperience"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Опыт разлуки с хозяином"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="behaviorAlone"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Как ведет себя в одиночестве?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="characterTraits"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Особенности характера"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="whatLoves"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Что любит? (Игры, ритуалы)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="whatDoesntLove"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Что не любит?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="training"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 96 }}>
            <Dropdown
              multiple={false}
              options={training}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Наличие дрессировки"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="knowledgeTraining"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Какие команды знает?"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="attitudePeople"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 95 }}>
            <Dropdown
              multiple={false}
              options={attitudePeople}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Отношение к людям"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="attitudeDogs"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 94 }}>
            <Dropdown
              multiple={false}
              options={attitudeDogs}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Отношение к собакам"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="knowLeash"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Знает поводок?"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="knowMuzzle"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Знает намордник?"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="refusalMuzzle"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 6 }}>
            <Switch
              value={value}
              onChange={onChange}
              title="Отказ от намордника"
              options={[
                { label: 'Да', value: 'Да' },
                { label: 'Нет', value: 'Нет' },
              ]}
            />
            <Text style={[globalStyles.text500, { textAlign: 'center' }]}>
              Необходимо подписать доп. приложение к договору
            </Text>
          </View>
        )}
      />
      <Controller
        name="badHabits"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Вредные привычки"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="numberWalks"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 93 }}>
            <Dropdown
              multiple={false}
              options={numberWalks}
              selectedValue={value}
              onSelect={onChange}
              placeholder="Количество прогулок в сутки (обычный режим питомца)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="walkingTime"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Время выгулов и продолжительность"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="walkingFeatures"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Особенности выгула"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="specialRequests"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Особые пожелания"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="addressDog"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 150,
            message: 'Максимальное кол-во символов: 150',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Адрес собаки (город, улица, дом, кв, подъезд, этаж)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="preferredMessenger"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Максимальное кол-во символов: 100',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Контактные телефоны и предпочтительный мессенджер для отчётов"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="returnOwner"
        control={control}
        rules={{  required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Собака возвращается только хозяину"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="trustedPerson"
        control={control}
        rules={{
          required: true,
          maxLength: {
            value: 150,
            message: 'Максимальное кол-во символов: 150',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Доверенное лицо (если имеется, но не более 3)"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Дополнить</Button>
    </View>
  );
}

export default AddForm;
