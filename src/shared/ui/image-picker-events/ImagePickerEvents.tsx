import React from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import PlaceholderImage from '../placeholder-image/PlaceholderImage';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  image: string | null;
  onChange: (uri: string | null) => void;
}

export default function ImagePickerEvents({ image, onChange }: Props) {
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
    <TouchableOpacity onPress={() => selectImage(true)}>
      <View>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <AntDesign name="plus" size={30} color="#273B4A" />
          </View>
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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    width: 56,
    height: 56,
    borderColor: '#A78F77',
    borderRadius: 12
  },
});
