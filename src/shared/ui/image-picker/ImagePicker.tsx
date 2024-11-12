import React from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import PlaceholderImage from '../placeholder-image/PlaceholderImage';

interface Props {
  image: string | null;
  onChange: (uri: string | null) => void;
  variant?: 'user' | 'pet'
 }

export default function ImagePicker({
  image,
  onChange,
  variant = 'user'
}: Props) {
  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImgPicker.ImagePickerOptions = {
      mediaTypes: ImgPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImgPicker.launchImageLibraryAsync(options);
    } else {
      await ImgPicker.requestCameraPermissionsAsync();
      result = await ImgPicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => selectImage(true)}>
      <View>
        {image ? (
          // Отображение изображения в base64 формате
          <Image
            source={{ uri: image }}
            style={styles.avatar}
          />
        ) : (
          // Плейсхолдер, если изображение не выбрано
          <PlaceholderImage variant={variant} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
});
