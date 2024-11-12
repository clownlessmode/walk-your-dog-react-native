import React from 'react';
import { Text, View, Button } from 'react-native';
import { useMutation } from '@tanstack/react-query'; // Импортируем из @tanstack/react-query
import axios, { AxiosError } from 'axios';

// Интерфейс для данных питомца
interface PetData {
  owner: string;
  breed: string;
  gender: string;
  sterilized: boolean;
}

// Интерфейс ошибки с сервера
interface ApiError {
  message: string[];
  error: string;
  statusCode: number;
}

// Функция для отправки данных питомца
const submitPetData = async (petData: PetData): Promise<any> => {
  const { data } = await axios.post('https://r6nt2plp-4500.asse.devtunnels.ms/api/pets', petData);
  return data;
};

// Хук для использования мутации
const useSubmitPet = () => {
  return useMutation<any, AxiosError<ApiError>, PetData>({
    mutationFn: submitPetData, // В TanStack React Query mutationFn определяет функцию мутации
    onError: (error: AxiosError<ApiError>) => {
      if (error.response && error.response.data) {
        const apiError = error.response.data;
        console.error('Произошла ошибка:', apiError.message);
      } else {
        console.error('Ошибка:', error.message);
      }
    },
  });
};

const FetchExample = () => {
  const { mutate, error, isError } = useSubmitPet();

  const handleSubmit = () => {
    mutate({
      owner: 'invalid-uuid', // Пример данных
      breed: 'invalid-uuid',
      gender: 'UNKNOWN',
      sterilized: false,
    });
  };

  return (
    <View>
      <Button title="Submit" onPress={handleSubmit} />
      {isError && (
        <View>
          <Text>Error occurred!</Text>
          {error && error.response?.data?.message.map((msg: string, index: number) => (
            <Text key={index}>{msg}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default FetchExample;
