import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import * as ImgPicker from 'expo-image-picker';
import ConfirmDeleteModal from '@shared/ui/confirm-delete/ConfirmDelete';
import globalStyles from '@shared/constants/globalStyles';
import Error from '@shared/ui/error/Error';
import Input from '@shared/ui/input/Input';
import styles from './styles';
import Button from '@shared/ui/button/Button';
import TimerProgress from '@widgets/time-progress/TimeProgress';
import Drawer from '@shared/ui/drawer/Drawer';
import useTimerStore from '@widgets/time-progress/time.store';
import Toast from 'react-native-toast-message';
import TimerToast from '@features/timer-toast/TimerToast';
import { useReportController } from '@entity/reports/reports.controller';

interface FormData {
  images: any[];
  comment: any;
}

function Form() {
  const { reportAttach, loadingReportsAttach } = useReportController();
  const { startTimer } = useTimerStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    startTimer(); // Запускаем таймер при входе на страницу
  }, [startTimer]);

  const { control, handleSubmit, getValues, setValue, formState } =
    useForm<FormData>({
      defaultValues: {
        images: [],
        comment: '',
      },
    });

  const selectImage = async () => {
    const options: ImgPicker.ImagePickerOptions = {
      mediaTypes: ImgPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    const result = await ImgPicker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      const currentImages = getValues('images');
      setValue('images', [...currentImages, result.assets[0].uri]);
    }
  };

  const handleDelete = () => {
    const images = getValues('images');
    if (selectedIndex !== null) {
      const updatedImages = images.filter((_, i) => i !== selectedIndex);
      setValue('images', updatedImages);
      setSelectedIndex(null);
      setModalVisible(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log('Форма отправлена:', data);
    // const response = await reportAttach({ serviceId });
    // console.log("Ответ от сервера reportClose", response)
  };

  return (
    <View style={{ justifyContent: 'space-between', flex: 1, paddingTop: 12 }}>
      <TimerToast />
      <View>
        <Text
          style={[
            globalStyles.text400,
            { color: '#B8B8B8', fontSize: 12, marginBottom: 8 },
          ]}
        >
          Прикрепите до 4 фотографий питомца
        </Text>
        <View style={{ gap: 12 }}>
          <Controller
            name="images"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || 'Добавьте хотя бы одну фотографию',
            }}
            render={({ field: { value }, fieldState }) => (
              <View>
                <View
                  style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}
                >
                  {value.length < 4 && (
                    <TouchableOpacity
                      onPress={selectImage}
                      style={styles.placeholder}
                    >
                      <AntDesign name="plus" size={24} color="#273B4A" />
                    </TouchableOpacity>
                  )}
                  {value.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedIndex(index);
                        setModalVisible(true);
                      }}
                    >
                      <Image source={{ uri: image }} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </View>
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
            name="comment"
            control={control}
            rules={{
              required: 'Комментарий обязателен',
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <View style={{ gap: 2, width: '100%' }}>
                <Input
                  style={[globalStyles.text400, styles.input]}
                  value={value}
                  multiline={true}
                  onChangeText={onChange}
                  placeholder="Комменарий об указанной услуге"
                  error={!!fieldState.error}
                  placeholderTextColor="#C1C1C1"
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
          <Drawer
            trigger={
              <Text style={[globalStyles.text500, { textAlign: 'center' }]}>
                Просмотреть оставшееся время
              </Text>
            }
          >
            <View style={{ gap: 12 }}>
              <Text
                style={[
                  globalStyles.text500,
                  { textAlign: 'center', fontSize: 18 },
                ]}
              >
                У вас есть 30 минут на заполнение формы
              </Text>
              <TimerProgress />
            </View>
          </Drawer>
        </View>
      </View>
      <View>
        <Button onPress={handleSubmit(onSubmit)}>Сохранить</Button>
      </View>
      <ConfirmDeleteModal
        title={'Вы уверены, что хотите удалить фотографию?'}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}

export default Form;
