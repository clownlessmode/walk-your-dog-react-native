import { User } from '@entity/users/model/user.interface';
import { useUserController } from '@entity/users/user.controller';
import useUserStore from '@entity/users/user.store';
import { useFocusEffect } from '@react-navigation/native';
import { baseApi } from '@shared/api/base.api';
import { useCallback } from 'react';

const fetchData = async (id: string): Promise<User | undefined> => {
  try {
    const response = await baseApi.get<User>(`users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return undefined;
  }
};

const getMeOnFocus = () => {
  const { user, setUser } = useUserStore();
  const { getMe } = useUserController();

  useFocusEffect(
    useCallback(() => {
      const fetchAndSetUser = async () => {
        if (user && user.id) {
          const response = await fetchData(user.id);
          if (response) {
            setUser(response);
          } else {
            console.error("Пользователь не найден или не удалось получить данные.");
          }
        } else {
          console.error("Пользователь не определен.");
        }
      };

      fetchAndSetUser();

      return () => {

      };
    }, [])
  );
};

export default getMeOnFocus;
