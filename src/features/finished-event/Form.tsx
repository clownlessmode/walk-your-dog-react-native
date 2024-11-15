import globalStyles from '@shared/constants/globalStyles';
import Drawer from '@shared/ui/drawer/Drawer';
import ImagePickerEvents from '@shared/ui/image-picker-events/ImagePickerEvents';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
interface FormData {
  image: any;
}
function Form() {
    const [isModalVisible, setIsModalVisible] = useState(false);
  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      image: null,
    },
  });
  return (
    <View>
      <View style={{gap: 4}}>
        <Text style={[globalStyles.text400, {color: '#B8B8B8', fontSize: 12}]}>Прикрепите фотографии питомца</Text>
        <View>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImagePickerEvents onChange={onChange} image={value} />
            )}
          />
        </View>
        <Drawer
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        hasBackdrop={false}
      >
            <Text>ffff</Text>
        </Drawer>
      </View>
    </View>
  );
}

export default Form;
